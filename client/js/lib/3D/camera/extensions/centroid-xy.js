import easing from "/js/lib/helpers/math/easing.js";

const {
   abs,
} = Math;

const {
   lerp,
} = easing;

const
	MOVE_SPEED = 0.2,
   CENTROID_THRESHOLD = 0.002,
	DAMPING_FACTOR = 0.1;

class Centroid {
   #camera;
   #state;

   constructor(camera, state) {
      this.#camera = camera;
      this.#state = state;
   }

	enable() {
      const { origin, direction, cross, last_camera_pos, last_centroid_pos, centroid_offset } = this.#state;
		this.#camera.getWorldDirection(direction);
		cross.crossVectors(direction, this.#camera.up);
		last_camera_pos.copy(this.#camera.position);
		last_centroid_pos.copy(origin);
		centroid_offset.set(0, 0, 0);
	}

	move() {
		const camera = this.#camera, { aspect } = camera;
      const { centroid_offset, dirX, dirY, cross, direction, dst_centroid_pos, dst_camera_pos, last_centroid_pos, last_camera_pos } = this.#state;

		centroid_offset.x -= dirX * 0.1 * MOVE_SPEED;
		centroid_offset.z += dirY * 0.1 * MOVE_SPEED * aspect;

		const 
			rx = cross.x * centroid_offset.x,
			rz = cross.z * centroid_offset.x,
			fx = direction.x * centroid_offset.z,
			fz = direction.z * centroid_offset.z;

		dst_centroid_pos.x = last_centroid_pos.x + rx + fx;
		dst_centroid_pos.z = last_centroid_pos.z + rz + fz;
		dst_camera_pos.x = last_camera_pos.x + rx + fx;
		dst_camera_pos.z = last_camera_pos.z + rz + fz;

		THREEViewer.system.pool.addTarget(this.#camera.uuid, this.damping);
	}

	damping = () => {
      const { origin, dst_centroid_pos, dst_camera_pos } = this.#state, camera = this.#camera;
		origin.x = lerp(origin.x, dst_centroid_pos.x, DAMPING_FACTOR);
		origin.z = lerp(origin.z, dst_centroid_pos.z, DAMPING_FACTOR);
		camera.position.x = lerp(camera.position.x, dst_camera_pos.x, DAMPING_FACTOR);
		camera.position.z = lerp(camera.position.z, dst_camera_pos.z, DAMPING_FACTOR);

		camera.lookAt(origin);

		const threshold = this.offsetThreshold(camera.position);

		if (threshold) this.clear(); 
	}

   clear() {
		THREEViewer.system.pool.removeTarget(this.#camera.uuid);
	}

	offsetThreshold(src_camera_pos) {
      const { dst_camera_pos } = this.#state;
		const
			dx = abs(src_camera_pos.x - dst_camera_pos.x),
			dy = abs(src_camera_pos.z - dst_camera_pos.z),
			tx = dx < CENTROID_THRESHOLD,
			ty = dy < CENTROID_THRESHOLD;

		return tx * ty;
	}

   pointerUp = () => {};
   pointerDown = () => {};
}

export default Centroid;
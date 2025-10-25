const {
   abs,
} = Math;

const
	MOVE_SPEED = 0.1,
   CENTROID_THRESHOLD = 0.001,
	DAMPING_FACTOR = 0.1;

class Centroid {
   #camera;
   #state;
	#cross_x = new THREE.Vector3();
	#cross_y = new THREE.Vector3();
	#dst_origin = new THREE.Vector3();
	#offset = new THREE.Vector3();

   constructor(camera, state) {
      this.#camera = camera;
      this.#state = state;
   }

	enable() {
      const { origin, direction, cross, last_camera_pos, last_centroid_pos, centroid_offset } = this.#state;
		this.#camera.getWorldDirection(direction);
		cross.crossVectors(direction, this.#camera.up);
		this.#cross_x.crossVectors(direction, this.#camera.up).normalize();
		this.#cross_y.crossVectors(this.#cross_x, direction).normalize();
		last_camera_pos.copy(this.#camera.position);
		last_centroid_pos.copy(origin);
		centroid_offset.set(0, 0, 0);
	}

	move() {
      const { dirX, dirY, origin } = this.#state;

		this.#offset.subVectors(this.#camera.position, origin);

		this.#dst_origin.copy(origin);
		this.#dst_origin.addScaledVector(this.#cross_x, -dirX * MOVE_SPEED);
		this.#dst_origin.addScaledVector(this.#cross_y, dirY * MOVE_SPEED);

		THREEViewer.system.pool.addTarget(this.#camera.uuid, this.damping);
	}

	damping = () => {
      const { origin } = this.#state;

		origin.lerp(this.#dst_origin, DAMPING_FACTOR);
		this.#camera.position.copy(origin).add(this.#offset);
		this.#camera.lookAt(origin);

		const threshold = this.offsetThreshold(this.#camera.position);

		if (threshold) this.clear(); 
	}

   clear() {
		THREEViewer.system.pool.removeTarget(this.#camera.uuid);
	}

	offsetThreshold() {
      const { origin } = this.#state, { x, y, z} = this.#dst_origin;
		const
			dx = abs(x - origin.x),
			dy = abs(y - origin.y),
			dz = abs(z - origin.z),
			tx = dx < CENTROID_THRESHOLD,
			ty = dy < CENTROID_THRESHOLD,
			tz = dz < CENTROID_THRESHOLD;

		return tx * ty * tz;
	}

   pointerUp = () => {};
   pointerDown = () => {};
}

export default Centroid;
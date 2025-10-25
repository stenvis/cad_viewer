import easing from '/js/lib/helpers/math/easing.js';

const {
   abs,
   sin, cos,
   min, max,
} = Math;

const {
   lerp,
} = easing;

const
   ZOOM_SPEED = 0.004,
   ZOOM_THRESHOLD = 0.002,
   ZOOM_DAMPING_FACTOR = 0.1,
   MIN_DIST = 0.1,
   MAX_DIST = 40;

class Zoom {
   #camera;
   #state;
   #vec3 = new THREE.Vector3();
   #target_distance;

   constructor(camera, state) {
      this.#camera = camera;
      this.#state = state;
   }

   change(n) {
      n = max(-80, min(80, n));
      const { distance } = this.#state;
      this.#target_distance = max(MIN_DIST, min(MAX_DIST, distance + (n * ZOOM_SPEED * distance)));

		THREEViewer.system.pool.addTarget(this.#camera.uuid + 'zoom', this.damping);
   }

   damping = () => {
      const { origin, src_euler, distance } = this.#state;
      const x = src_euler.x, y = src_euler.y;

      this.#state.distance = lerp(distance, this.#target_distance, ZOOM_DAMPING_FACTOR);

      this.#vec3.x = -sin(x) * cos(y); this.#vec3.y = sin(y); this.#vec3.z = cos(x) * cos(y);
      this.#vec3.multiplyScalar(this.#state.distance);
      this.#vec3.add(origin);

      this.#camera.position.copy(this.#vec3);
      this.#camera.lookAt(origin);

      const threshold = this.zoomThreshold();

      if (threshold) this.clear();
   }

   clear() {
		THREEViewer.system.pool.removeTarget(this.#camera.uuid + 'zoom');
   }

   zoomThreshold() {
      const { distance } = this.#state;
   	const 
   		dn = abs(this.#target_distance - distance),
   		tn = dn < ZOOM_THRESHOLD;

   	return tn;
   } 
}

export default Zoom;
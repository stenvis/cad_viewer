import easing from "/js/lib/helpers/math/easing.js";
import Elapsed from "/js/lib/helpers/math/elapsed.js";

const elapsed = new Elapsed();

const {
   sqrt, abs,
   max, min,
   sin, cos,
   atan2,
   PI,
} = Math;

const {
   lerp,
   easeInOutCubic,
} = easing;

const
	RAD = PI / 180;

const
   ANGLE_THRESHOLD = 0.001,
   ROTATION_SPEED = 0.2,
   DAMPING_FACTOR_INNER = 0.2,
   DAMPING_FACTOR_OUTER = 0.1,
   DAMPING_FACTOR_SHOW = 0.04,
   MAX_POLAR_ANGLE = 89 * RAD,
   MIN_POLAR_ANGLE = -89 * RAD,
   INERTIA_FACTOR = 0.5;

class Orbtial {
   #camera;
   #state;
   #damping_factor = 0.1;
   #rotation_speed = 1;
   #src_distance = 1;
   #dst_distance = 1;
   #src_origin = new THREE.Vector3();
   #dst_origin = new THREE.Vector3();
   #temp_euler = new THREE.Euler(0, 0, 0, 'YXZ');
   #is_active_reset = false;

   constructor(camera, state) {
      this.#camera = camera;
      this.#state = state;
   }

   enable() {}

   rotate(azimuth, polar, dst_distance, speed) {
      const { src_euler, dst_euler, distance, origin } = this.#state;
      dst_euler.x = -azimuth * RAD;
      dst_euler.y = polar * RAD;
      this.#temp_euler.copy(src_euler);
      this.#rotation_speed = speed || this.#rotation_speed;
      this.#src_distance = distance;
      this.#dst_distance = dst_distance || distance;
      this.#src_origin.copy(origin);

      this.#is_active_reset = true;
      elapsed.stamp();
      THREEViewer.system.pool.rewriteTarget(this.#camera.uuid, this.interpolate);
   }

   interpolate = () => {
      const { src_euler, dst_euler, vec3 } = this.#state;

      const progress = easeInOutCubic(min((elapsed.time() / 1000) * this.#rotation_speed, 1));
      const camera = this.#camera, 
         x = src_euler.x = lerp(this.#temp_euler.x, dst_euler.x, progress),
		   y = src_euler.y = lerp(this.#temp_euler.y, dst_euler.y, progress),
         d = this.#state.distance = lerp(this.#src_distance, this.#dst_distance, progress),
         o = this.#state.origin.lerpVectors(this.#src_origin, this.#dst_origin, progress);

      vec3.x = -sin(x) * cos(y); vec3.y = sin(y); vec3.z = cos(x) * cos(y);
      vec3.multiplyScalar(d);
      vec3.add(o);

      camera.position.copy(vec3);
      camera.lookAt(o);

		THREEViewer.emitters.camera.emit('orbital_damping', vec3, o);

      if (progress === 1) {
         this.#is_active_reset = false;
         this.clear();
      }
   }

   defineAngles() {
      const { src_euler, dst_euler, vec3, origin } = this.#state, { position } = this.#camera;
      this.#state.distance = position.distanceTo(origin);
      vec3.copy(position).sub(origin);
      dst_euler.x = src_euler.x = atan2(-vec3.x, vec3.z);
      dst_euler.y = src_euler.y = atan2(vec3.y, sqrt(vec3.x ** 2 + vec3.z ** 2));
   }

   move() {
      const { dst_euler, dirX, dirY } = this.#state;

      dst_euler.x += dirX * ROTATION_SPEED * RAD;
      dst_euler.y += dirY * ROTATION_SPEED * RAD;
      dst_euler.y = max(MIN_POLAR_ANGLE, min(MAX_POLAR_ANGLE, dst_euler.y));

		THREEViewer.system.pool.addTarget(this.#camera.uuid, this.damping);
   }

   damping = () => {
      const { src_euler, dst_euler, distance, vec3, origin } = this.#state;
      const camera = this.#camera,
         x = src_euler.x = lerp(src_euler.x, dst_euler.x, this.#damping_factor),
         y = src_euler.y = lerp(src_euler.y, dst_euler.y, this.#damping_factor);

      vec3.x = -sin(x) * cos(y); vec3.y = sin(y); vec3.z = cos(x) * cos(y);
      vec3.multiplyScalar(distance);
      vec3.add(origin);

      camera.position.copy(vec3);
      camera.lookAt(origin);

      const threshold = this.angleThreshold();

		THREEViewer.emitters.camera.emit('orbital_damping', vec3, origin);

      if (threshold) this.clear();
   }

   pointerUp() {
      const { dst_euler, dirX, dirY } = this.#state;
      this.#damping_factor = DAMPING_FACTOR_OUTER;
      dst_euler.x += dirX * 0.01 * INERTIA_FACTOR;
      dst_euler.y += dirY * 0.01 * INERTIA_FACTOR;
      dst_euler.y = max(MIN_POLAR_ANGLE, min(MAX_POLAR_ANGLE, dst_euler.y));
   }

   pointerDown() {
      this.defineAngles();
      this.#damping_factor = DAMPING_FACTOR_INNER;
   }

   clear() {
		THREEViewer.system.pool.removeTarget(this.#camera.uuid);
   }

   angleThreshold() {
      const { src_euler, dst_euler } = this.#state;
   	const 
   		dx = abs(src_euler.x - dst_euler.x),
   		dy = abs(src_euler.y - dst_euler.y),
   		tx = dx < ANGLE_THRESHOLD,
   		ty = dy < ANGLE_THRESHOLD;

   	return tx * ty;
   }
}

export default Orbtial;
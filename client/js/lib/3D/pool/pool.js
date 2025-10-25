const { keys } = Object;

const clock = new THREE.Clock();

const FIXED_DT = 1 / 60;

class AnimationPool {
   #keys = [];
   #keys_length;
   #pool = {};
   #is_runned;

   addTarget(key, fn) {
      if (this.#pool[key]) return;
      this.#pool[key] = fn;
      this.updateLength();
      if (!this.#is_runned) {
         this.#is_runned = true;
         this.pass();
      }
   }

   rewriteTarget(key, fn) {
      this.#pool[key] = fn;
      this.updateLength();
      if (!this.#is_runned) {
         this.#is_runned = true;
         this.pass();
      }
   }

   removeTarget(key) {
      delete this.#pool[key];
      this.updateLength();
   }

   updateLength() {
      this.#keys = keys(this.#pool);
      this.#keys_length = this.#keys.length;
   }

   pass() {
      if (!this.#keys_length) {
         this.#is_runned = false;
         return;
      }

      for (let i = 0; i < this.#keys_length; i++) {
         this.#pool[this.#keys[i]](FIXED_DT);
      }

      window.render.animate();
   }

   isKey(key) {
      return this.#keys.includes(key);
   }

   get is_runned() {
      return this.#keys_length;
   }
};

export default AnimationPool;
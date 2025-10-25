class EventEmitter {
   #LISTENERS = {};

   on(type, fn) {
      if (!this.#LISTENERS[type]) this.#LISTENERS[type] = [];

      const index = this.#LISTENERS[type].findIndex(l => l === fn);

      if (index !== -1) {
         this.#LISTENERS[type][index] = fn;
         return;
      }

      this.#LISTENERS[type].push(fn);
   }

   off(type, fn) {
      if (!this.#LISTENERS[type]) return;

      this.#LISTENERS[type] = this.#LISTENERS[type].filter(l => l !== fn);
   }

   emit(type, ...args) {
      if (!this.#LISTENERS[type]) {
         console.log('Nothing to emit!: %c' + type, 'color: red; font-weight: bold;');
         return;
      }

      for (const fn of this.#LISTENERS[type]) fn(...args);
   }

   once(type, fn) {
      const wrapper = (...args) => {
         fn(...args);
         this.off(type, wrapper);
      };

      this.on(type, wrapper);

      return wrapper; // we can delete once by "off(type, wrapper)";
   }
}

export default EventEmitter;
// Byte Load Monitor

class BLMonitor {
   #total_sum;
   #loaded_sum;
   #targets = {};
   #handler;

   constructor(handler) {
      this.#handler = handler || (() => {});
   }

   updateTarget(key, xhr) {
      if (this.#targets[key]) {
         this.#targets[key].loaded = xhr.loaded;
         this.updateLoadedSum();
         return;
      }

      const { loaded, total } = xhr;
      this.#targets[key] = {
         loaded,
         total,
      };
      this.updateLoadedSum();
   }

   updateLoadedSum() {
      this.#total_sum = 0;
      this.#loaded_sum = 0;

      for (const key in this.#targets) {
         const { loaded, total } = this.#targets[key]; 
         this.#loaded_sum += loaded;
         this.#total_sum += total;
      }

      const percent_complete = ~~((this.#loaded_sum / this.#total_sum) * 100);
      
      this.#handler(percent_complete);
   }

   reset() {
      this.#total_sum = 0;
      this.#loaded_sum = 0;
      this.#targets = {};
   }

   get total_sum() {
      return this.#total_sum;
   }

   get loaded_sum() {
      return this.#loaded_sum;
   }
};

export default BLMonitor;
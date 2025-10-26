class Elapsed  {
   #start_time;
   #SMOOTHING_FACTOR = 0.1;
   #smoothed_elapsed_time = 0;

   init() {
      this.#start_time = performance.now();
   }

   stamp() {
      this.#start_time = performance.now();
   }

   time() {
      return performance.now() - this.#start_time;
   }

   smoothTime() {
      const elapsed_time = performance.now() - this.#start_time;

      this.#smoothed_elapsed_time += (elapsed_time - this.#smoothed_elapsed_time) * this.#SMOOTHING_FACTOR;

      return this.#smoothed_elapsed_time;
   }

   reset() {
      this.#smoothed_elapsed_time = 0;
   }
};

export default Elapsed;
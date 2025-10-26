class Resize {
   #renderer;
   #canvas;
   #camera;
   #width;
   #height;

   constructor({ renderer, camera }, canvas) {
      this.#renderer = renderer;
      this.#camera = camera;
      this.#canvas = canvas;
   }

   check() {
      const width = this.#width = this.#canvas.clientWidth;
      const height = this.#height = this.#canvas.clientHeight;
      this.#camera.aspect = width / height;
      this.#camera.updateProjectionMatrix();
      this.#renderer.setSize(width, height, false);
      this.#renderer.setPixelRatio(window.devicePixelRatio);
   }

   get width() {
      return this.#width;
   }

   get height() {
      return this.#height;
   }
};
 
export default Resize;
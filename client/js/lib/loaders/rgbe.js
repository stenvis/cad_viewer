import { RGBELoader as _RGBELoader } from '/dependencies/three/loaders/RGBELoader.js'; 

let generator;

const pmrem_generator = renderer => {
   generator = new THREE.PMREMGenerator(renderer);
   generator.compileEquirectangularShader();
};

class RGBELoader {
   #loader;
   #counter = 0;

   constructor() {
      this.#loader = new _RGBELoader();
   }

   load(path) {
      const promise = new Promise(res => {
         this.#loader.load(path, hdrmap => {
            // const hdr = generator.fromCubemap(hdrmap).texture;

            const hdr = generator.fromEquirectangular(hdrmap).texture;
            hdr.mapping = THREE.EquirectangularReflectionMapping; 

           	// hdr.mapping = THREE.EquirectangularReflectionMapping;

            this.loadDone();
            res(hdr);
         });
      });

      return promise;
   }

   loadDone() {
      this.#counter += 1;
   }

   get getLoadedCount() {
      return this.#counter;
   }
};

const RGBE = new RGBELoader();

export default RGBE;
export { pmrem_generator };
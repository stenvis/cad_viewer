class TextureLoader {
   #loader;
   #on_loading_count = 0;
   #counter = 0;

   constructor() {
      this.#loader = new THREE.FileLoader();
      this.#loader.setResponseType('blob');
   }

   load(key, path) {
      this.#on_loading_count += 1;
      const promise = new Promise(res => {
         this.#loader.load(path,
            blob => {
               const obj_url = URL.createObjectURL(blob), image = new Image();

               image.onload = () => {
                  URL.revokeObjectURL(obj_url);
                  const texture = new THREE.Texture(image);
                  texture.needsUpdate = true;
                  this.loadDone();
                  res(texture);
               };

               image.src = obj_url;
            },
            xhr => {
               if (xhr.lengthComputable) THREEViewer.monitors.preload.updateTarget(key, xhr);
            },
         );
      });
      return promise;
   }

   loadDone() {
      this.#counter += 1;
   }

   get getLoadedCount() {
      return this.#counter;
   }

   get getOnLoadingCount() {
      return this.#on_loading_count;
   }
};

const Texture = new TextureLoader();

export default Texture;
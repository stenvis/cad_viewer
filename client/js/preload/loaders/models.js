import GLTF from '/js/lib/loaders/gltf.js';

let onload = 0;

function start(models, checkLoadStatus) {
   onload = 0;

   for (const name in models) {
      const { path } = models[name];
      GLTF.load(name, path, checkLoadStatus);
      onload++;
   }
}

function getOnloadCount() {
   return onload;
}

function getReadyCount() {
   return GLTF.getLoadedCount;
}

const loadModels = {
   start,
   getOnloadCount,
   getReadyCount,
};

export default loadModels;
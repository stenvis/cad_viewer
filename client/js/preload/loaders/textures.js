import Texture from '/js/lib/loaders/texture.js';

let onload = 0;

function start(textures, checkLoadStatus) {
   onload = 0;

   for (const key in textures) {
      const { url } = textures[key];
      Texture.load(key, url).then(texture => {
         THREEViewer.dataset.textures.setObject(key, texture);
         checkLoadStatus();
      });
      onload++;
   }
}

function getOnloadCount() {
   return onload;
}

function getReadyCount() {
   return Texture.getLoadedCount;
} 

const loadTextures = {
   start,
   getOnloadCount,
   getReadyCount,
};

export default loadTextures;
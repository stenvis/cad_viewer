import RGBE from '/js/lib/loaders/rgbe.js';

let onload;


function start(textures, checkLoadStatus) {
   onload = 0;

   for (const key in textures) {
      const { url } = textures[key];

      RGBE.load(url).then(hdr => {
         THREEViewer.dataset.hdrs.setObject(key, hdr);
         checkLoadStatus();
      });

      onload++;
   }
}

function getOnloadCount() {
   return onload;
}

function getReadyCount() {
   return RGBE.getLoadedCount;
} 


const loadHDRs = {
   start,
   getOnloadCount,
   getReadyCount,
};

export default loadHDRs;
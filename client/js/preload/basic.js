import loadModels from './loaders/models.js'
import loadTextures from './loaders/textures.js'
import models from './onload/models.js';
import textures from './onload/textures.js';

let simple_stage_executed = false;


function getOnloadCount() {
   return loadModels.getOnloadCount() + loadTextures.getOnloadCount();
}

function getLoadedCount() {
   return loadModels.getReadyCount() + loadTextures.getReadyCount();
}

function checkLoadStatus() {
   const onload_count = getOnloadCount(), loaded_count = getLoadedCount();

   if (onload_count == loaded_count) {
      if (simple_stage_executed) console.warn('%c Simple stage already executed, loading leak!', 'color: red');
      THREEViewer.emitters.preloading.emit('preloading_done');
      simple_stage_executed = true;
   }
}

function basicLoader() {
   loadModels.start(models, checkLoadStatus);
   loadTextures.start(textures, checkLoadStatus);
}

export default basicLoader;
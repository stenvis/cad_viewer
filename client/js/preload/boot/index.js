import DOM from "/js/storage/dom.js";
import runtime from "./runtime.js";

const {
   preload_line,
   preload_value,
} = DOM;


function updateProgressStatus(width) {
   preload_line.style.width = width + '%';
   preload_value.textContent = width + '%';
}

function init() {
   THREEViewer.emitters.preloading.on('preloading_done', runtime);
}


const boot = {
   init,
   updateProgressStatus,
};

export default boot;
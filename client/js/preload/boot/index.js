import DOM from "/js/storage/dom.js";
import launch from "./launch.js";

const {
   min,
} = Math;

const {
   preload_line,
   preload_value,
} = DOM;


function updateProgressStatus(width) {
   const w = min(width, 100);
   preload_line.style.width = w + '%';
   preload_value.textContent = w + '%';
}

function init() {
   THREEViewer.emitters.preloading.on('preloading_done', launch);
}


const boot = {
   init,
   updateProgressStatus,
};

export default boot;
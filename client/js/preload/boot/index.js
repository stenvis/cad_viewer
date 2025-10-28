import DOM from "/js/storage/dom.js";
import launch from "./launch.js";

const {
   preload_line,
   preload_value,
} = DOM;


function updateProgressStatus(width) {
   preload_line.style.width = width + '%';
   preload_value.textContent = width + '%';
}

function init() {
   THREEViewer.emitters.preloading.on('preloading_done', launch);
}


const boot = {
   init,
   updateProgressStatus,
};

export default boot;
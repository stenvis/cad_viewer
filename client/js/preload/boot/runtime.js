import render from '/js/system/render.js';
import UI from "/js/UI/ui.js";
import DOM from "/js/storage/dom.js";

const {
   preload_progress,
} = DOM;

function runtime() {
   preload_progress.classList.add('hidden');
   setTimeout(() => { preload_progress.remove(); }, 450);
   THREEViewer.system.workspace.setViewMode();
   THREEViewer.system.gizmo.init();
   render.start();
   UI.register();
}

export default runtime;
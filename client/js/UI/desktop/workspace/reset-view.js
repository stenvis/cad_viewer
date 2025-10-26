import ev from '/js/lib/helpers/browser/ev-listener.js';
import DOM from '/js/storage/dom.js';

const {
   reset_view,
} = DOM;

function resetView() {
   THREEViewer.system.orbital.rotateOrbital(30, 25);
}

function register() {
   ev.on(reset_view, 'click', resetView);
}

const devtools_ui = {
   register,
}

export default devtools_ui;
import ev from '/js/lib/helpers/browser/ev-listener.js';
import DOM from '/js/storage/dom.js';
import GLTF from '/js/lib/loaders/gltf.js';

const reader = new FileReader();

const {
   input_glb,
   upload_glb,
} = DOM;

function readData() {
   if (this.files[0]) reader.readAsArrayBuffer(this.files[0]);
   input_glb.value = '';
}

function loadData() {
   const { result } = reader;
   if (!result) return;
   GLTF.parse(result);
}

function openInput() {
   input_glb.click();
}

function register() {
   ev.on(upload_glb, 'click', openInput);
   ev.on(input_glb, 'change', readData);
   ev.on(reader, 'load', loadData);
}

const devtools_ui = {
   register,
}

export default devtools_ui;
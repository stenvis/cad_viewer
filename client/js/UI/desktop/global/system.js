import ev from '/js/lib/helpers/browser/ev-listener.js';

function disableContextMenu(e) {
   e.preventDefault();
}

function register() {
   ev.on(document, 'contextmenu', disableContextMenu); 
}

const system_ui = {
   register,
};

export default system_ui;
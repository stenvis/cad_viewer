import desktop from './desktop/index.js';
import mobile from './mobile/index.js';

const DEVICE_TYPES = {
   desktop,
   mobile,
};

function register() {
   const { type } = THREEViewer.device_status;

   console.log('DEVICE: %c' + type, 'color: orange; font-weight: bold;');

   DEVICE_TYPES[type]();
}

const UI = {
   register,
};

export default UI;
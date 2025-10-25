import Dataset from '/js/lib/helpers/collection/dataset.js';
import EventEmitter from "/js/lib/helpers/observer/observer.js";
import BLMonitor from '/js/lib/helpers/monitor.js';
import device from '/js/system/init/device.js';
import boot from '/js/preload/boot/index.js';

const collections = ['models'];

const dataset = new Dataset(collections);

const emitters = {
   'preloading': new EventEmitter(),
   'camera': new EventEmitter(),
};

const monitors = {
   'preload': new BLMonitor(boot.updateProgressStatus),
};

const device_status = device.defineStatus(); 

window.THREEViewer.add({
   dataset,
   emitters,
   monitors,
   device_status,
});

export default THREEViewer;
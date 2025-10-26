import elements from "/js/lib/helpers/elements.js";

const {
   GEBI,
   GEBCN,
   QS,
   GEBTN,
} = elements;

const 
   canvas = GEBI('canvas'),
   preload_progress = GEBI('preload-progress'),
   preload_line = GEBI('preload-line'),
   preload_value = GEBI('preload-value'),

   input_glb = GEBI('input-glb'),
   upload_glb = GEBI('upload-glb'),
   reset_view = GEBI('reset-view');

const DOM = {
   canvas,
   preload_progress,
   preload_line,
   preload_value,

   input_glb,
   upload_glb,
   reset_view,
};

export default DOM;
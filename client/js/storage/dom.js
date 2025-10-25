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

   upload_image = GEBI('upload-image');

const DOM = {
   canvas,
   preload_progress,
   preload_line,
   preload_value,
   upload_image,
};

export default DOM;
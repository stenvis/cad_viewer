const on = (element, evType, handler, options, obj = {
   on: (element, evType, handler) => (element.addEventListener(evType, handler), obj),
}) => (element.addEventListener(evType, handler, options), obj);

const onArr = (elements, evType, handler, obj = {
   onArr: (elements, evType, handler) => { for (const element of elements) element.addEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.addEventListener(evType, handler); return obj };

const off = (element, evType, handler, obj = {
   off: (element, evType, handler) => (element.removeEventListener(evType, handler), obj),
}) => (element.removeEventListener(evType, handler), obj);

const offArr = (elements, evType, handler, obj = {
   offArr: (elements, evType, handler) => { for (const element of elements) element.removeEventListener(evType, handler); return obj },
}) => { for (const element of elements) element.removeEventListener(evType, handler); return obj };


const ev = {
   on,
   onArr,
   off,
   offArr,
};

export default ev;
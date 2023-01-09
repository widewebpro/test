/*
USAGE:

handleEvent('event', {
  el: NODE,
  useCapture: [optional] (default: false),
  preventDefault: [optional] (default: true),
  stopPropagation: [optional] (default: true),
  callback: () => {}
})

*/

const handleEvent = (eventName, {
  el,
  delegateEl,
  callback,
  useCapture = false,
  preventDefault = true,
  stopPropagation = true
} = {}, thisArg) => {
  const element = el || document.documentElement;

if(typeof eventName != 'string') {
console.warn(`
Provide an event type as a string:

handleEvent('event', { ... })
`)
}

if(!el) {
console.warn(`
You provided ${el}.
Provide a NODE to attach event to.

handleEvent('event', { el: NODE })
`)
}

  const handler = (e) => {
      if(preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      if (delegateEl) {
        console.log(e.target);
        // loop parent nodes from the target to the delegation node
        // for (var target = e.target; target && target != this; target = target.parentNode) {
        //   console.log(target, delegateEl);
        //   // if (target.matches(delegateEl)) {
        //   //   handler.call(target, e);
        //   //   break;
        //   // }
        // }
      }

      if (typeof callback === 'function') {
          callback.call(thisArg, e);
      }
  }

  handler.destroy = function destroy() {
    element.removeEventListener(eventName, handler, useCapture);
  };

  element.addEventListener(eventName, handler, useCapture);

  return handler;
}

export default handleEvent;

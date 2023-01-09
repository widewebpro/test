import {easeOutQuart} from './easings'

const scrollTo = ({target, duration=600, offset=0, easing=easeOutQuart, callback}) => {
    if(!target) return;

    var start = window.pageYOffset;

    let opt = {
        duration: duration,
        offset: offset,
        callback: callback,
        easing: easing
    }

    let distance = typeof target === 'string' ? document.querySelector(target) : target;
    distance = distance.getBoundingClientRect().top + opt.offset;

    let dur = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration;

    let timeStart, timeElapsed;

    requestAnimationFrame(function(time) {
        timeStart = time
        loop(time)
    })

    function loop(time) {
        timeElapsed = time - timeStart
        window.scrollTo(0, opt.easing(timeElapsed, start, distance, dur))

        if (timeElapsed < dur) {
            requestAnimationFrame(loop)
        } else {
            end()
        }
    }

    function end() {
        window.scrollTo(0, start + distance)

        if (typeof opt.callback === 'function')
            opt.callback()
    }
}

export default scrollTo;

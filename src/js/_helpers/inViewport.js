const inViewport = function(el, scroll) {
    var bounding = el.getBoundingClientRect();

    return (
        bounding.left >= 0 &&
        bounding.bottom <= (scroll || window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (scroll || window.innerWidth || document.documentElement.clientWidth)
    );
};

export default inViewport;

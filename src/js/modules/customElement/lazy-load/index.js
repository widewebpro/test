class LazyLoadNew {
  constructor(selector) {
    this.selectorForLazyLoad = selector
    this.pictures = document.querySelectorAll(`.${selector}`)
  }
  imgUI({
          imgClass, src, altText,
          urlMobileWebP, urlTabletWebP, urlDesktopWebP,
          urlMobile, urlTablet, urlDesktop
        }) {
    return `
    <source srcset="${urlMobileWebP}" media="screen and (max-device-width: 640px)" type="image/webp">
    <source srcset="${urlTabletWebP}" media="(min-device-width: 641px) and (max-device-width: 1025px)" type="image/webp">
    <source srcset="${urlDesktopWebP}" media="(min-device-width: 1026px)" type="image/webp">
    <img src="${src}" alt="${altText}"
      class="${imgClass}"
      srcset="${urlMobile} 1920w,
              ${urlTablet} 1440w,
              ${urlDesktop} 940w"
      sizes="screen and (max-device-width: 640px) 280px,
            (min-device-width: 641px) and (max-device-width: 1025px) 440px,
            (min-device-width: 1026px) 1440px"
    >
    `
  }
  picturesInit() {
    this.pictures = document.querySelectorAll(`.${this.selectorForLazyLoad}`);
  }
  lazyLoading() {
    const scrollTop = window.pageYOffset
    this.picturesInit()
    this.pictures.forEach((picture,ind) => {
      if (
        (scrollTop > (picture.getBoundingClientRect().top - (window.innerHeight - 200)) ||
        picture.getBoundingClientRect().top < (window.innerHeight - 200)) &&
          picture.classList.contains(this.selectorForLazyLoad)
      ) {
        const imgParams = {
          src: picture.getAttribute('data-src'),
          imgClass: picture.getAttribute('data-img-class'),
          altText: picture.getAttribute('data-alt-text'),
          urlMobileWebP: picture.getAttribute('data-mobile-webp'),
          urlTabletWebP: picture.getAttribute('data-tablet-webp'),
          urlDesktopWebP: picture.getAttribute('data-desktop-webp'),
          urlMobile: picture.getAttribute('data-url-mobile'),
          urlTablet: picture.getAttribute('data-url-tablet'),
          urlDesktop: picture.getAttribute('data-url-desktop')
        }

        picture.innerHTML = this.imgUI(imgParams);

        if (picture.querySelector('img')) {
          picture.classList.remove(this.selectorForLazyLoad);
        }
      }
    })
  }
}

class LazyLoadBg {
  constructor(selector) {
    this.selectorForLazyLoad = selector
    this.blocksWithBg = document.querySelectorAll(`.${selector}`)
    this.windowWidth = window.innerWidth
    this.checkIsSafari()
  }
  checkIsSafari() {
    this.isSafari = /constructor/i.test(window.HTMLElement) ||
      (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))
  }
  blocksWithBgInit() {
    this.blocksWithBg = document.querySelectorAll(`.${this.selectorForLazyLoad}`)
  }
  lazyLoading() {
    const scrollTop = window.pageYOffset
    this.blocksWithBgInit()
    this.blocksWithBg.forEach((blocksWithBg,ind) => {
      if (
        (scrollTop > (blocksWithBg.offsetTop - (window.innerHeight + 100)) ||
          blocksWithBg.offsetTop < (window.innerHeight + 100)) &&
        blocksWithBg.classList.contains(this.selectorForLazyLoad)
      ) {
        const blockId = blocksWithBg.dataset.id
        const $lazyData = document.getElementById(blockId)
        if (!$lazyData) return
        if (this.windowWidth > 768) {
          blocksWithBg.style.backgroundImage = this.isSafari ?
            `url(${$lazyData.dataset.urlDesktop})` : `url(${$lazyData.dataset.desktopWebp})`
        } else if (this.windowWidth > 375) {
          blocksWithBg.style.backgroundImage = this.isSafari ?
            `url(${$lazyData.dataset.urlTablet})` : `url(${$lazyData.dataset.tabletWebp})`
        } else {
          blocksWithBg.style.backgroundImage = this.isSafari ?
            `url(${$lazyData.dataset.urlMobile})` : `url(${$lazyData.dataset.mobileWebp})`
        }
        $lazyData.remove();
        blocksWithBg.classList.remove(this.selectorForLazyLoad);
      }
    })
  }
}

// window.onload = function() {
if (document.querySelectorAll('.lazy-load-new').length) {
  const LazyNew = new LazyLoadNew('lazy-load-new')
  LazyNew.lazyLoading()
  document.addEventListener('scroll', () => {
    if (document.querySelectorAll('.lazy-load-new').length) LazyNew.lazyLoading()
  })
}
if (document.querySelector('.lazy-load-bg')) {
  const LazyBg = new LazyLoadBg('lazy-load-bg')
  LazyBg.lazyLoading()
  setTimeout(() => {
    LazyBg.lazyLoading()
  }, 1000)
  document.addEventListener('scroll', () => {
    if (document.querySelector('.lazy-load-bg')) LazyBg.lazyLoading()
  })
}


// lazy from video/img async

export default function lazy () {
    let lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));
    let lazyImg = [].slice.call(document.querySelectorAll('picture.lazy'));

    if(lazyImg.length > 0) {
      if ('IntersectionObserver' in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              for (let source in video.target.children) {
                let videoSource = video.target.children[source];

                if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                  video.target.querySelector('img').src = videoSource.dataset.src;
                }
              }

              video.target.classList.remove('lazy');
              lazyVideoObserver.unobserve(video.target);
            }
          });
        });

        lazyImg.forEach(function(lazyImg) {
          lazyVideoObserver.observe(lazyImg);
        });
      }
    }

    if(lazyVideos.length > 0) {
      if ('IntersectionObserver' in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              for (let source in video.target.children) {
                let videoSource = video.target.children[source];


                if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                  videoSource.src = videoSource.dataset.src;
                }
              }

              video.target.load();
              video.target.classList.remove('lazy');
              lazyVideoObserver.unobserve(video.target);
            }
          });
        });

        lazyVideos.forEach(function(lazyVideo) {
          lazyVideoObserver.observe(lazyVideo);
        });
      }
    }
}

lazy();

let gifLoad = () =>{
  const scrollTop = window.pageYOffset
  document.querySelectorAll('.gif').forEach(element => 
    {
      let src = element.getAttribute('data-src')
      if (
        (scrollTop > (element.getBoundingClientRect().top - (window.innerHeight - 200)) ||
        element.getBoundingClientRect().top < (window.innerHeight - 200))
      ) {
        element.setAttribute('src', src)
        element.classList.remove('gif')
      }
    });
};

gifLoad();

let videoLoad = () =>{
  const scrollTop = window.pageYOffset
  document.querySelectorAll('.video').forEach(element => 
    {
      let src = element.getAttribute('data-src')
      if (
        (scrollTop > (element.getBoundingClientRect().top - (window.innerHeight - 200)) ||
        element.getBoundingClientRect().top < (window.innerHeight - 200))
      ) {
        element.setAttribute('src', src)
        element.classList.remove('video')
      }
    });
};

videoLoad();

document.addEventListener('scroll', () => {
  lazy();
  gifLoad();
  videoLoad();
})



let scriptLoad = ()=> {
  document.querySelectorAll('.load-script').forEach(element => 
    {
      let scriptSrc = element.getAttribute('data-srciptsrc');
      let scriptValue = element.getAttribute('data-srcipt');
      let scriptLoadTime = element.getAttribute('data-loadtime');
      let script = document.createElement('script');
     
      if (scriptLoadTime.length == 0){
        scriptLoadTime = 2000
      }
      if (scriptSrc.length != 0){
        script.setAttribute('src', scriptSrc);
      }
      if (scriptValue.length != 0){
        script.append(scriptValue);
      }
      
      setTimeout(() => {
        document.querySelector('body').append(script)
      }, scriptLoadTime)
    });
}

scriptLoad()

function lazyImg() {
  document.querySelectorAll('img.lazy-img').forEach(img => {
    if(window.scrollY + document.documentElement.clientHeight >= img.getBoundingClientRect().top) {
      img.setAttribute('src', img.dataset.src)
      img.classList.remove('lazy-img')
    }
  })
}

lazyImg()

document.addEventListener('scroll', () => {
  lazyImg();
})
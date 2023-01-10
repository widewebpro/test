import Swiper, { Thumbs, Navigation } from 'swiper';
Swiper.use([Thumbs, Navigation]);

class sliderBlock extends HTMLElement {
  constructor() {
    super();
    this.init();
    this.modal();
  }

  init() {

    let swiper2 = new Swiper('.myswiper2', {
      spaceBetween: 28,
      slidesPerView: 4,
    });

    let swiper1 = new Swiper('.myswiper', {
      spaceBetween: 10,
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiper2,
      }
    });

  }

  modal() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      let slides = document.querySelectorAll('.myswiper .swiper-slide');
      slides.forEach((item)=> {
        item.addEventListener('click', (e) => {
          this.querySelector('.full-width-slider').classList.remove('hidden');
          let fullswiper2 = new Swiper('.fullSwiper2', {
            spaceBetween: 28,
            slidesPerView: 4,
          });

          let fullswiper1 = new Swiper('.fullSwiper', {
            spaceBetween: 10,
            slidesPerView: 1,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            thumbs: {
              swiper: fullswiper2,
            }
          });
        })
      })
      this.querySelector('.close-modal').addEventListener('click', () => {
        this.querySelector('.full-width-slider').classList.add('hidden')
      })
    }
  }
}

export default customElements.define('slider-block', sliderBlock);

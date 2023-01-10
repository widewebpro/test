import { handleEvent } from '../../../_helpers';

class openCart extends HTMLElement {
  constructor() {
    super();
    this.open();
  }

  open() {
    handleEvent('click', {
      el: this.querySelector('.open-cart__btn'),
      preventDefault: true,
      callback: (e) => {
        this.show(e);
      }
    });

    handleEvent('click', {
      el: document.body,
      preventDefault: false,
      callback: (e) => {
        this.close(e);
      }
    });
  }
  show(e) {
    if (e.target.closest('.open-cart__btn')) {
      this.querySelector('.cartDrop').classList.remove('hidden')
    }
  }

  close(e) {
    if(!e.target.closest('.cartDrop') && !e.target.closest('.cartDrop-item') && !this.querySelector('.cartDrop').classList.contains('hidden')) {
      this.querySelector('.cartDrop').classList.add('hidden')
    }
  }




}

export default customElements.define('open-cart', openCart);

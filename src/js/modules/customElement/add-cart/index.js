
class addCart extends HTMLElement {
  constructor() {
    super();
    this.count();
  }

  count() {
    let discountPrice = parseInt(this.querySelector('.product__discount-price').innerHTML.replace(/[^\d]/g, '')) / 100

    let productCount = parseInt(this.querySelector('.product-count').innerHTML)
    console.log(productCount)
    let btnPlus = this.querySelector('.product-btn__plus')
    let btnMinus = this.querySelector('.product-btn__minus')

    btnPlus.addEventListener('click', () => {
        productCount++
        this.querySelector('.product-count').innerHTML = productCount
        return productCount;
    })

    btnMinus.addEventListener('click', () => {
      if (productCount > 0) {
        productCount--
        this.querySelector('.product-count').innerHTML = productCount
        return productCount;
      }
    })

    let addBtn = this.querySelector('.add-cart__btn')
    addBtn.addEventListener('click', (e) => {
      if(productCount > 0) {
        let productTitle = document.querySelector('.product__title').innerHTML
        let imgSrc = document.querySelector('.myswiper .swiper-slide img').src
        let fullPrice = discountPrice * productCount
        let cartItem = `<div class="cartDrop-item flex items-center justify-between mb-26">
                      <div class="w-50 h-50 rounded-4 overflow-hidden mr-16 item__image">
                        <picture>
                          <img class="w-full h-full object-cover" src="${imgSrc}" alt="">
                        </picture>
                      </div>
                      <div class="text-style-l4 text-gray-0 mr-16">
                        <p class="item__title">
                          ${productTitle}
                        </p>
                        <p>
                          <span>$${discountPrice}.00 x ${productCount}</span> <span class="font-KumbhBold text-dark-0">$${fullPrice}.00</span>
                        </p>
                      </div>
                      <div class="item__remove cursor-pointer text-gray-4 hover:text-dark-0 transition-colors duration-300">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.625V1.75C0 1.33438 0.334375 1 0.75 1H4.25L4.54375 0.415625C4.66875 0.159375 4.92812 0 5.2125 0H8.78438C9.06875 0 9.32812 0.159375 9.45625 0.415625L9.75 1H13.25C13.6656 1 14 1.33438 14 1.75V2.625C14 2.83125 13.8313 3 13.625 3H0.375C0.16875 3 0 2.83125 0 2.625ZM13 4.375V14.5C13 15.3281 12.3281 16 11.5 16H2.5C1.67188 16 1 15.3281 1 14.5V4.375C1 4.16875 1.16875 4 1.375 4H12.625C12.8313 4 13 4.16875 13 4.375ZM4 6C4.275 6 4.5 6.225 4.5 6.5V13.5C4.5 13.775 4.275 14 4 14C3.725 14 3.5 13.775 3.5 13.5V6.5C3.5 6.225 3.725 6 4 6ZM7.5 6.5C7.5 6.225 7.275 6 7 6C6.725 6 6.5 6.225 6.5 6.5V13.5C6.5 13.775 6.725 14 7 14C7.275 14 7.5 13.775 7.5 13.5V6.5ZM10 6C10.275 6 10.5 6.225 10.5 6.5V13.5C10.5 13.775 10.275 14 10 14C9.725 14 9.5 13.775 9.5 13.5V6.5C9.5 6.225 9.725 6 10 6Z" fill="currentColor"/>
                          <mask id="mask0_0_632" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="16">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.625V1.75C0 1.33438 0.334375 1 0.75 1H4.25L4.54375 0.415625C4.66875 0.159375 4.92812 0 5.2125 0H8.78438C9.06875 0 9.32812 0.159375 9.45625 0.415625L9.75 1H13.25C13.6656 1 14 1.33438 14 1.75V2.625C14 2.83125 13.8313 3 13.625 3H0.375C0.16875 3 0 2.83125 0 2.625ZM13 4.375V14.5C13 15.3281 12.3281 16 11.5 16H2.5C1.67188 16 1 15.3281 1 14.5V4.375C1 4.16875 1.16875 4 1.375 4H12.625C12.8313 4 13 4.16875 13 4.375ZM4 6C4.275 6 4.5 6.225 4.5 6.5V13.5C4.5 13.775 4.275 14 4 14C3.725 14 3.5 13.775 3.5 13.5V6.5C3.5 6.225 3.725 6 4 6ZM7.5 6.5C7.5 6.225 7.275 6 7 6C6.725 6 6.5 6.225 6.5 6.5V13.5C6.5 13.775 6.725 14 7 14C7.275 14 7.5 13.775 7.5 13.5V6.5ZM10 6C10.275 6 10.5 6.225 10.5 6.5V13.5C10.5 13.775 10.275 14 10 14C9.725 14 9.5 13.775 9.5 13.5V6.5C9.5 6.225 9.725 6 10 6Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask0_0_632)">
                          </g>
                        </svg>

                      </div>
                    </div>`
        let itemsWrap = document.querySelector('.cartDrop__items-wrap')
        itemsWrap.innerHTML = cartItem
        let cartCountIcon = document.querySelector('.open-cart__count')
        cartCountIcon.innerHTML = productCount;
        document.querySelector('.cartDrop__empty').classList.add('hidden')
        document.querySelector('.cartDrop__items').classList.remove('hidden')
        cartCountIcon.classList.remove('hidden')

        let removeItemBtns = document.querySelectorAll('.item__remove')
        removeItemBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            let item = e.target.closest('.cartDrop-item')
            item.remove()
            if (!document.querySelector('.cartDrop__items-wrap .cartDrop-item')) {
              document.querySelector('.cartDrop__empty').classList.remove('hidden')
              document.querySelector('.cartDrop__items').classList.add('hidden')
              cartCountIcon.classList.add('hidden')
            }
          })
        })
      }
    })

  }


}

export default customElements.define('add-cart', addCart);

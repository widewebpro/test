import gsap from 'gsap';
import { handleEvent } from '../../../_helpers';

class CustomElement extends HTMLElement {
  constructor() {
    super();

    this.DOM = {}
    this.DOM.el = this
    this.DOM.drawer = document.querySelector('menu-drawer')
    this.DOM.close = this.DOM.drawer.querySelector('#close-menu-drawer')

    this.DOM.main = document.querySelector('main')
    this.DOM.focusable = this.DOM.drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    this.DOM.firstFocusable = this.DOM.focusable[0]
    this.DOM.lastFocusable = this.DOM.focusable[this.DOM.focusable.length - 1]

    this.active = false
    this.closing = false
    this.openClickEvents = {}
    this.openEnterEvents = {}

    this.events()
  }

  events() {
    this.toggleEvents(this, () => this.open())
    this.toggleEvents(this.DOM.close, () => this.close())

    handleEvent('keyup', {
      el: this.DOM.drawer,
      callback: (e) => {
        if (e.type === 'keyup' && e.key !== 'Escape') {
          return;
        }

        this.close()
      }
    })

    // handleEvent('keydown', {
    //   el: this.DOM.firstFocusable,
    //   callback: (e) => this.moveFocusToBottom(e)
    // })

    handleEvent('keydown', {
      el: this.DOM.lastFocusable,
      callback: (e) => {
        this.moveFocusToTop(e)
      }
    })
  }

  toggleEvents(el, cb) {
    handleEvent('click', {
      el: el,
      callback: () => {
        console.log('click', el);
        cb()
      }
    })

    handleEvent('keypress', {
      el: el,
      callback: (e) => {
        console.log(e);
        if (e.key === 'Enter') {
          cb()
        }
      }
    })
  }

  open() {
    if(this.active || this.closing) return

    this.setAttribute('aria-hidden', 'false')
    this.setAttribute('aria-expanded', 'true')

    this.DOM.main.setAttribute('aria-hidden', 'true')
    this.DOM.firstFocusable.classList.add('focused')

    setTimeout(() => {
      this.DOM.firstFocusable.focus()
      console.log('focus', this.DOM.firstFocusable);
    }, 1);

    this.setVisibility(1)
    gsap.to(this.DOM.drawer, {
      x: '0%',
      ease: 'power4.out',
      duration: 0.8
    })

    if(!this.bodyClickEvent) {
      this.bodyClickEvent = handleEvent('click', {
        el: document.body,
        preventDefault: false,
        callback: (e) => this.handleBodyClick(e)
      })
    }

    this.active = true;
  }

  close() {
    if(!this.active) return
    this.closing = true

    this.DOM.main.removeAttribute('aria-hidden')
    this.removeAttribute('aria-hidden')

    setTimeout(() => this.focus(), 1);

    this.bodyClickEvent.destroy()
    this.bodyClickEvent = null

    gsap.to(this.DOM.drawer, {
      x: '-100%',
      ease: 'power4.out',
      duration: 0.4,
      onComplete: () => {
        this.closing = false
        this.setVisibility(0)
      }
    })

    this.active = false;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.DOM.drawer && !target.closest('menu-drawer')) {
      this.close();
    }
  }

  moveFocusToTop(e) {
    console.log(e.key === 'Tab', !e.shiftKey);
    if (e.key === 'Tab' && !e.shiftKey) {
      // e.preventDefault();
      this.DOM.firstFocusable.focus();
    }
  }

  moveFocusToBottom(e) {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      this.DOM.lastFocusable.focus()
    }
  }

  setVisibility(bool) {
    gsap.set(this.DOM.drawer, {autoAlpha: bool})
  }
}

  //   // jQuery element variables
  //   var $hamburgerMenuBtn,
  //       $slideNav,
  //       $closeBtn,
  //       $main;

  //   // focus management variables
  //   var $focusableInNav,
  //       $firstFocusableElement,
  //       $lastFocusableElement;

  //   $(document).ready(function() {
  //     $hamburgerMenuBtn = $("#hamburger-menu"),
  //       $slideNav = $("#slide-nav"),
  //       $closeBtn = $("#close"),
  //       $main = $("main"),
  //       $focusableInNav = $('#slide-nav button, #slide-nav [href], #slide-nav input, #slide-nav select, #slide-nav textarea, #slide-nav [tabindex]:not([tabindex="-1"])');
  //     if ($focusableInNav.length) {
  //       $firstFocusableElement = $focusableInNav.first();
  //       $lastFocusableElement = $focusableInNav.last();
  //     }
  //     addEventListeners();
  //   });

  //   function addEventListeners() {
  //     $hamburgerMenuBtn.click(openNav);
  //     $closeBtn.click(closeNav);
  //     $slideNav.on("keyup", closeNav);
  //     $firstFocusableElement.on("keydown", moveFocusToBottom);
  //     $lastFocusableElement.on("keydown", moveFocusToTop);
  //   }

  //   function openNav() {
  //     $slideNav.addClass("visible active");
  //     setTimeout(function() {
  //       $firstFocusableElement.focus()
  //     }, 1);
  //     $main.attr("aria-hidden", "true");
  //     $hamburgerMenuBtn.attr("aria-hidden", "true");
  //   }

  //   function closeNav(e) {
  //     if (e.type === "keyup" && e.key !== "Escape") {
  //       return;
  //     }

  //     $slideNav.removeClass("active");
  //     $main.removeAttr("aria-hidden");
  //     $hamburgerMenuBtn.removeAttr("aria-hidden");
  //     setTimeout(function() {
  //       $hamburgerMenuBtn.focus()
  //     }, 1);
  //     setTimeout(function() {
  //       $slideNav.removeClass("visible")
  //     }, 501);
  //   }

  //   function moveFocusToTop(e) {
  //     if (e.key === "Tab" && !e.shiftKey) {
  //       e.preventDefault();
  //       $firstFocusableElement.focus();
  //     }
  //   }

  //   function moveFocusToBottom(e) {
  //     if (e.key === "Tab" && e.shiftKey) {
  //       e.preventDefault();
  //       $lastFocusableElement.focus()
  //     }
  //   }

export default customElements.define('menu-drawer-action', CustomElement);

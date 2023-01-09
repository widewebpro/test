import { handleEvent } from '../../_helpers'

export default class {
  // Set inital vars
  constructor() {
    this.DOM = {}
    this.DOM.el = qs('.site-header')

    console.log('Header - Set Vars');
  }

  // Initilize Module
  init() {
    console.log('Header - Initilize');

    this.handleEvents()
  }

  handleEvents() {
    this.clickEvent = handleEvent('click', {
      el: this.DOM.el,
      callback: () => {
        console.log(`${this.DOM.el} was clicked!`);
        this.handleClick(el)
      }
    })
  }

  handleClick(el) {
    el.style.background = 'blue'
  }

  // Destroy Everything
  destroy() {
    console.log('Header - Destroy');

    this.clickEvent.destroy()
  }
}

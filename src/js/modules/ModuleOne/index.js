import { handleEvent } from '../../_helpers'
import screens from '../../../../tailwind/configs/screens'

export default class {
  // Set inital vars
  constructor(el) {
    console.log(`ModuleOne - Set Vars`, screens);
    this.DOM = {}
    this.DOM.el = el
  }

  // Initilize Module
  init() {
    console.log(`ModuleOne - Initilized on ${this.DOM.el}`);
    this.handleEvents()
  }

  // Handle Events Module
  handleEvents() {
    this.clickEvent = handleEvent('click', {
      el: this.DOM.el,
      callback: () => {
        this.handleClick(this.DOM.el)
      }
    })
  }

  handleClick(el) {
    console.log(`${this.DOM.el} was clicked!`);
    el.style.background = 'blue'
  }

  // Destroy Everything
  destroy() {
    console.log('ModuleOne - Destroy');
    this.clickEvent.destroy()
  }
}

/*
  To assign a module to a specific UI element:
  - Add: class="js-module"
  - Add: data-js-module="ModuleName"

  This will dynamically load any module that is needed for a spcific element/component

  The element is passed to the custructor() as a param so you can use it.

  constructor(el) {
    this.DOM = {}
    this.DOM.el = el

    console.log(el) // will produce "<componentElement />"
  }
*/

import {getModule} from '../_actions'
import { handleEvent, throttle } from '../_helpers'

export default class ModuleRenderer {
  constructor() {
    this.renderedModules = []
    this.renderedCustomElements = []
    this.scroll_events = []
  }

  init() {
    this.modules = document.getElementsByClassName('js-module')
    this.customElements = document.getElementsByClassName('js-custom-el')
    this.importedModules = []

    // Custom Elements
    for (let i = 0; i < this.customElements.length; i++) {
      const module = this.customElements[i];
      let moduleName = module.getAttribute('data-js-module');
      this.renderedCustomElements[i] = this.importCustomElement(moduleName)
    }

    // Regular Modules
    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      let moduleName = module.getAttribute('data-js-module');

      if(moduleName) {
        if(moduleName.includes(',')) {
          moduleName = moduleName.split(',')
          let multipeModulesArray = []

          for (let x = 0; x < moduleName.length; x++) {
            this.observer(module, i, () => {
              let name = moduleName[x];
              multipeModulesArray[x] = this.importModule(name, module)

              this.renderedModules[i] = multipeModulesArray
              this.renderedModules[i][x].module.then((x) => x.init())

              this.importedModules[i] = {
                'name': moduleName,
                'el': module
              }

              if (module.getAttribute('module-loading') == 'lazy') {
                console.log('Initialized Lazy Module:', this.renderedModules[i]);
              }
            })
          }
        } else {
          this.observer(module, i, () => {
            this.renderedModules[i] = this.importModule(moduleName, module)
            this.renderedModules[i].module.then((x) => {
              if(!x) return
              return x.init()
            }).then(() => {
              this.importedModules[i] = {
                'name': moduleName,
                'el': module
              }
              if (module.getAttribute('module-loading') == 'lazy') {

                let module_loader = module.parentNode.querySelector('.module-loader') ?? module.querySelector('.module-loader') ?? null

                if (module_loader) {
                  module_loader.style.transition = 'opacity 1s ease'
                  module_loader.style.opacity = '0'
                  setTimeout(() => {module_loader.remove()}, 1000);
                }

                console.log('Initialized Lazy Module:', this.renderedModules[i]);
              }
            })
          })
        }
      }
    }

    console.log('Initialized Modules:', this.importedModules);
    console.log('Initialized customElements:', this.renderedCustomElements);
  }

  buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;

    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  observer(el, i, cb) {
    if (el.getAttribute('module-loading') != 'lazy') {
      cb()
    } else {
      if (el.offsetTop - 200 <= window.pageYOffset + window.innerHeight) {
        cb()
      } else {
        this.scroll_events[i] = handleEvent('scroll', {
          el: window,
          callback: throttle(() => {
            if (el.offsetTop - 200 <= window.pageYOffset + window.innerHeight) {
              cb()

              if (this.scroll_events[i]) {
                this.scroll_events[i].destroy()
                this.scroll_events[i] = null
              }
            }
          }, 300)
        })
      }
    }
  }

  isModule(renderedModule) {
    let obj = {}

    if('module' in renderedModule) {
      renderedModule.module.then((x) => x.init())

      obj = {
        'name': moduleName,
        'el': module
      }
    }

    return obj
  }

  importCustomElement(name) {
    return {
      name: name,
      module: getModule(name)
    }
  }

  importModule(name, module) {
    return {
      name: name,
      module: getModule(name).then((x) => {
        if (!x) return
        return new x.default(module)
      }).catch((e) => {
        console.log(module, e);
      })
    }
  }

  destroy() {
    this.destroyedModules = []
    // Destroy all components!
    for (let i = 0; i < this.renderedModules.length; i++) {
      let moduleObj = this.renderedModules[i];

      if(Array.isArray(moduleObj)) {
        this.destroyedModules[i] = [];

        for (let x = 0; x < moduleObj.length; x++) {
          this.destroyedModules[i][x] = moduleObj[x].name
          this.destroyModule(moduleObj[x].name, moduleObj[x].module)
        }
      } else {
        this.destroyedModules[i] = moduleObj.name
        this.destroyModule(moduleObj.name, moduleObj.module)
      }
    }

    console.log('Destroyed Modules:', this.destroyedModules);
  }

  destroyModule(module) {
    if (typeof module != 'object') return

    module.then((x) => {
      if (typeof x.destroy != 'function') return
      x.destroy()
    })
  }
}

if(!('loading' in document.createElement('img'))) {
  // Use loading="lazy"
  import(/* webpackPreload: true */ 'picturefill');
  import(/* webpackPreload: true */ 'lazysizes');
}

let modules = import('./modules').then((x) => new x.default())
modules.then((x) => x.init())

document.documentElement.classList.add('has-loaded')
document.documentElement.classList.remove('is-loading')
document.documentElement.classList.remove('no-js')

console.log(WEBPACK_DEV_BUILD);

if (WEBPACK_DEV_BUILD) {
  import('./dev').then((x) => new x.default());
}

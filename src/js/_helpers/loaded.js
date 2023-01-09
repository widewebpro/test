const loaded = (func) => {
  if(document.readyState !== 'loading') {
    func();
  } else {
    document.addEventListener('DOMContentLoaded', () => func());
  }
}

export default loaded;
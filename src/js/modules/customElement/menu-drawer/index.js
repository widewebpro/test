class CustomElement extends HTMLElement {
  constructor() {
    super();

    console.log(this);
  }
}

export default customElements.define('menu-drawer', CustomElement);

class CustomElement extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Clicked', this);
    });
  }
}

export default customElements.define('example-costom-element', CustomElement);

import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor(props) {
    let {
      element = null,
      onBackClicked = null,
      onAddToCartClicked = null,
    } = props;

    super({ element });

    this._phone = null;
    this._element = element;

    this._onBackClicked = onBackClicked;

    this._element.addEventListener('click', (event) => {
      this._handleBackClick(event);
    })
  }

  show(phoneDetails) {
    this._phone = phoneDetails;
    super.show();
    this._phone && this._render();
  }

  _handleBackClick(event) {
    if ( event.target.closest('[data-button="backButton"]') ) {
      this._onBackClicked();
    }
    return;
  }

  _render() {
    this._element && ( this._element.innerHTML = `
      <img class="phone" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">

      <button data-button='backButton'>Back</button>
      <button>Add to basket</button>
  
  
      <h1>Motorola XOOM™ with Wi-Fi</h1>
  
      <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
  
      <ul class="phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    ` )
  }
}

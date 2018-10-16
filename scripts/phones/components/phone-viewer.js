import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor(props) {
    let {
      element = null,
      onBackClicked = null,
      onAddToCartClicked = null,
    } = props;

    super({ element });

    this._phone = {};
    this._element = element;

    this._onBackClicked = onBackClicked;
    this._onAddToCartClicked = onAddToCartClicked;
    this._handleEscClick = this._handleEscClick.bind(this);

    this._element.addEventListener('click', (event) => {
      this._handleBackClick(event);
      this._handleAddToCartClick(event);
    })
  }

  show(phoneDetails) {
    this._phone = phoneDetails;
    super.show();
    this._phone && this._render();
  }

  _mountEventListeners() {
    window.addEventListener('keyup', this._handleEscClick);
  }

  _unmountEventListeners() {
    window.removeEventListener('keyup', this._handleEscClick);
  }

  _handleEscClick(event) {
    let ESC_CHAR_CODE = 27;
    if ( event && 
      event.which && 
      event.keyCode && 
      ( event.keyCode === ESC_CHAR_CODE )
    ) {
      this._onBackClicked();
      this._unmountEventListeners();
    }
    return;
  }

  _handleBackClick(event) {
    if ( event.target.closest('[data-button="backButton"]') ) {
      this._onBackClicked();
      this._unmountEventListeners();
    }
    return;
  }

  _handleAddToCartClick(event) {
    if ( event.target.closest('[data-button="addToCart"]') ) {
      this._onAddToCartClicked();
    }
    return;
  }

  _renderPhoneGallery() {
    let {
      images: phoneImageUrls = [],
    } = this._phone;

    if ( phoneImageUrls && phoneImageUrls.length > 0 ) {
      return (`
        <ul class="phone-thumbs">
          ${ phoneImageUrls.map((phoneUrl) => `
            <li>
              <img src="${ phoneUrl }">
            </li>
          `).join('') }
        </ul>
      `)
    } else return;
  }

  _render() {
    let {
      age: phoneAge = null,
      id: phoneId = '',
      imageUrl: phoneMainImageUrl = [],
      name: phoneName = '',
      snippet: phoneSnippet = '',
    } = this._phone;

    this._mountEventListeners();

    this._element && ( this._element.innerHTML = `
      <img class="phone" src="${ phoneMainImageUrl }">

      <button data-button='backButton'>Back</button>
      <button data-button='addToCart'>Add to basket</button>
  
      <h1>${ phoneName }</h1>
      <p>${ phoneSnippet }</p>
      ${ this._renderPhoneGallery() || '' }
    ` )
  }
}

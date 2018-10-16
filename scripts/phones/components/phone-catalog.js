import Component from '../../component.js';
import Cart from './cart.js';
import cartStore from './store.js';

export default class PhoneCatalog extends Component {
  constructor(props) {
    let {
      element,
      phones,
      onPhoneSelected,
      onAddToCartClicked,
    } = props;

    super({ element });

    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._onAddToCartClicked = onAddToCartClicked;

    this.render();

    this._element.addEventListener('click', (event) => {
      if ( event.target.closest('[data-button="addToCart"]') ) {
        this._handleAddToCartClick(event);
        return;
      }

      this._handlePhoneClick(event);
    });
  }

  _handlePhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) return;
    this._onPhoneSelected(phoneElement.dataset.phoneId);
  }

  _handleAddToCartClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');
    let phoneId = phoneElement.dataset.phoneId || null;

    cartStore.addItem(phoneId);
    this._onAddToCartClicked()
  }

  render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li
            class="thumbnail"
            data-element="phone"
            data-phone-id="${ phone.id }"
          >
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div
              data-button='addToCart'
              class="phones__btn-buy-wrapper"
            >
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
    `;
  }
}

import Component from '../../component.js';
import cartStore from './store.js';

export default class Cart extends Component {
  constructor(props) {
    let { element } = props;
    super(element);

    this._element = element;
    this._removeItem = this._removeItem.bind(this);
    this._mountEventListeners();

    this.render();
  }

  _mountEventListeners() {
    this._element.addEventListener('click', this._removeItem);
  }

  _removeItem(event) {
    if ( event.target.closest('[data-action="deleteCartItem"]') ) {
      let item = event.target.dataset.item;
      cartStore.removeItem(item);
      this.render();
    }
  }

  _renderCartItems() {
    let cartItems = cartStore.getItems();
    if ( cartItems.length === 0 ) return '';

    cartItems = cartItems.map((item) => (`
      <li>
        <span 
          data-element="cartItem"
        >
          ${ item }
        </span>
        <span 
          class="cart__button-delete"
          data-action='deleteCartItem'
          data-item=${ item }
        >
          Delete
        </span>
      </li>
    `)).join('');

    return `<ul>${ cartItems }</ul>`;
  }

  _renderCart() {
    return (`
      <p>Shopping Cart</p>
      ${ this._renderCartItems() }
    `)
  }

  render() {
    this._element.innerHTML = `${ this._renderCart() }`;
  }
}
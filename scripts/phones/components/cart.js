import Component from '../../component.js';
import cartStore from './store.js';

export default class Cart extends Component {
  constructor(props) {
    let {
      element
    } = props;
    super(element);

    this._element = element;

    this._render()
  }

  _renderCart() {
    let cartItems = cartStore.getItems();
    let renderCartItems = function() {
      if ( cartItems.length > 0 ) {
        cartItems = cartItems.map((item) => (`
          <li>${ item }</li>
        `)).join('');

        return `<ul>${ cartItems }</ul>`
      }
      return ''
    }

    return (`
      <p>Shopping Cart</p>
      ${ renderCartItems() }
    `)
  }

  _render() {
    this._element.innerHTML = `${ this._renderCart() }`
  }
}
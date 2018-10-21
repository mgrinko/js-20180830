import Component from '../../component.js'

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    // товары в корзине
    this._items = {
      //id: кол-во телефонов
      test: 2,
      foo: 1,
      bar: 3
    };

    this._render();

    // в конструкторе сразу вызывается removeItem при клике на кнопку, тк мы здесь же работаем с компонентом
    // addItem будет использоватся в других компонентах
    this._on('click', 'button-remove', (event) => {
      this.removeItem(event.target.dataset.item);
    });

    this._on('click', 'button-remove', (event) => {
       this.removeItem(event.target.dataset.item)
    }); 
  }

  addItem(item) {
    if (!this._items[item]) {
      this._items[item] = 0;
    }
    this._items[item]++;
    this._render();
  }

  removeItem(item) {
    if (this._items[item]) {
      this._items[item]--;
    }

    if (this._items[item] === 0) {
      delete this._items[item];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <h3>Shopping Cart</h3>
      <ul>
        ${ Object.keys(this._items).map(item => `
        
          <li>
          <!-- item это ключ, this._items[item] это значение-->
            ${ item } (${ this._items[item] })
            <button
              data-element="button-remove"
              data-item="${ item }"
            >
              x
            </button>
          </li>

        `).join('')}
      </ul>
    `;
  }
}
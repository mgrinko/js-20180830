import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import Cart from './components/cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._viewer = null;
    this._catalog = null;
    this._cart = null;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getPhone(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      onAddToCartClicked: () => {
        this._initCart();
      },
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onBackClicked: () => {
        this._viewer.hide();
        this._catalog.show();
      },
      onAddToCartClicked: () => {
        this._initCart();
      },
    })
  }

  _initCart() {
    this._cart = new Cart({
      element: this._element.querySelector('[data-component="cart"]'),
    })
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <p>
              Search:
              <input>
            </p>
    
            <p>
              Sort by:
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </section>
    
          <section data-component="cart">
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
      </div>
    `;
  }
}

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import PhoneFilter from './components/phone-filter.js';
import Cart from './components/cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._viewer = null;
    this._catalog = null;
    this._cart = null;
    this._filter = null;

    this._phones = PhoneService.getPhones();

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
    this._initFilter();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: this._phones,
      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getPhone(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      onAddToCartClicked: () => {
        this._cart.render();
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
        this._cart.render();
      },
    })
  }

  _initCart() {
    this._cart = new Cart({
      element: this._element.querySelector('[data-component="cart"]'),
    })
  }

  _initFilter() {
    this._filter = new PhoneFilter({
      element: this._element.querySelector('[data-select-sort="phones"]'),
      onOptionChange: (option) => {
        this._phones = PhoneService.sortPhones(option);
        this._catalog.render();
      }
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
              <section data-select-sort='phones'>
              </section>
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

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import { phonesStore } from './components/store.js';
import PhoneFilter from './components/phone-filter.js';
import PhoneSearch from './components/phone-search.js';
import Cart from './components/cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._viewer = null;
    this._catalog = null;
    this._cart = null;
    this._filter = null;
    this._search = null;
    this._filterFunction = () => true;

    this._phones = phonesStore.getItems();
    this._isPhonesLoaded = false;

    this._render();

    this._initPhonesStore();
    this._initViewer();
    this._initCart();
    this._initFilter();
    this._initSearch();
  }

  _initPhonesStore() {
    // Network delay
    setTimeout(() => {
      phonesStore.initStore(PhoneService.getPhones());
      this._phones = phonesStore.getItems();
      this._isPhonesLoaded = true;
      this._initCatalog();
    }, 4000)
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: this._phones,
      onPhoneSelected: (phoneId) => {
        let phoneDetails = phonesStore.getPhone(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      onAddToCartClicked: () => {
        this._cart.render();
      },
      phoneFilter: (phones) => {
        return phones.filter((phone) => this._filterFunction(phone))
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
        this._phones = phonesStore.sortPhones(option);

        this._isPhonesLoaded && 
        ( this._catalog.setPhones(this._phones) || 
        this._catalog.render() )
      }
    })
  }

  _initSearch() {
    this._search = new PhoneSearch({
      element: this._element.querySelector('[data-phone-search]'),
      onInputChange: (value) => {
        this._phones = phonesStore.filterPhones(value);

        this._isPhonesLoaded && 
        ( this._catalog.setPhones(this._phones) || 
        this._catalog.render() )
      },
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
              <form data-phone-search>
              </form>
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

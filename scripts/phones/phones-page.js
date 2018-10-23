import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilters();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._loadPhonesFromServer();

    this._catalog.subscribe('phoneSelected', (phoneId) => {
      PhoneService.getPhone(phoneId, (phoneDetails) => {
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });
    });

    this._catalog.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });
  }

  _loadPhonesFromCache() {
    const {sortkey, query} =  this._filter.getKeys();

    const phones = PhoneService.cachePhones
        .filter(phone =>  phone.name.toLowerCase().includes(query.toLowerCase()) )
        .sort( (phone1, phone2) => {
          if (phone1[sortkey] < phone2[sortkey]) return -1;
          if (phone2[sortkey] < phone1[sortkey]) return 1;
          return 0;
        });

    this._catalog.show(phones);
  }

  _loadPhonesFromServer() {
    PhoneService.getPhones((phones) => {
      PhoneService.cachePhones = phones;
      this._loadPhonesFromCache()
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._loadPhonesFromCache()
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilters() {
    this._filter = new PhonesFilter({
      element: this._element.querySelector('[data-component="phones-filter"]'),
    });

    this._filter.subscribe('sort', () => {
      this._loadPhonesFromCache()
    });

    this._filter.subscribe('search', (e) => {
      const {value} = e.target
      if (value.length < 3) {
        e.target.classList.add("error")
      } else {
        e.target.classList.remove("error");
      }
      this._loadPhonesFromCache()
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="container-fluid">
        <div class="row">
      
          <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <div data-component="phones-filter"></div>
            </section>
      
            <section>
              <div data-component="shopping-cart"></div>
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog" class="js-hidden"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
  }
}

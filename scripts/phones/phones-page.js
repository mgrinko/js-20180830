import PhoneService from './services/phone-service.js';
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phones-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesFilter from './components/phones-filter.js';

// это компонент, управляющий страницей телефона
'use strict'

export default class PhonesPage{

    constructor({element}) {
        this._element = element;
        this._render();

        this._initCatalog();
        this._initViewer();

        this._initShoppingCart();
        this._initFilters();
    }

    _initCatalog() {

      this._catalog = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: PhoneService.getPhones(),

        // св-во с функцией
        onPhoneSelected: (phoneId) => {
          let phoneDetailts = PhoneService.getPhone(phoneId);

          // при выборе телеф-на прятать каталог
          this._catalog.hide();
          this._viewer.show(phoneDetailts);
          console.log(phoneId);
        }
      })

    }

    _initViewer() {
      this._viewer = new PhoneViewer({
        element: this._element.querySelector(['[data-component="phone-viewer"]']),
      })
    }

    _initFilters() {
      this._filter = new PhonesFilter({
        element: this._element.querySelector('[data-component="phones-filter"]'),
      });
    }

    _initShoppingCart() {
      this._shoppingCart = new ShoppingCart({
        element: this._element.querySelector('[data-component="shopping-cart"]'),
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
            <div data-component="phone-catalog"></div>
            <!-- по умолчанию class="js-hidden", viewer не отображается -->
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
        
        `;
    }
}

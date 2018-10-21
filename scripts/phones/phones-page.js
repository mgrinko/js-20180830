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

        // убираем ее отсюда, чтобы иметь возможность его добавить, снять, с любой удобный момент, смотри *
        
        // св-во с функцией, callback, оно все время срабатывает
        // onPhoneSelected: (phoneId) => {
        //   let phoneDetailts = PhoneService.getPhone(phoneId);

        //   // при выборе телеф-на прятать каталог
        //   this._catalog.hide();
        //   this._viewer.show(phoneDetailts);
        //   console.log(phoneId);
        // }

      })

      // пока так работатть не будет тк _catalog это не DOM эл-т а JS объект
      // this._catalog.addEventListener('phoneSelected', () => {
      //   (phoneId) => {
      //       let phoneDetailts = PhoneService.getPhone(phoneId);
  
      //       // при выборе телеф-на прятать каталог
      //       this._catalog.hide();
      //       this._viewer.show(phoneDetailts);
      //       console.log(phoneId);
      //     }
      // })

      // а так будет тк у _catalog есть _element
      // тогда будут слушатся события, происходящие на КОРНЕВОМ ЭЛ-ТЕ каталога
      // нестандартные события генерируются у нового каталога
      // !! но так делать _catalog._element НЕЛЬЗЯ
      // this._catalog._element.addEventListener('phoneSelected', () => {
      //   (phoneId) => {
      //       // ...
      //     }
      // })

      // * вместо того, чтобы делать то, что было выше, можно просто на событие в каталоге подписаться
      // чтобы каталог умел генерировать свои собственные события, например кастомное событие phoneSelected
      this._catalog.subscribe('phoneSelected', (phoneId) => {
        let phoneDetails = PhoneService.getPhone(phoneId);
  
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });
  
      this._catalog.subscribe('add', (phoneId) => {
        this._shoppingCart.addItem(phoneId);
      });
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

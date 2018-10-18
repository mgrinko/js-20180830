
import PhoneService from './services/phone-service.js';
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phones-viewer.js';

// это компонент, управляющий страницей телефона
'use strict'

export default class PhonesPage{

    constructor({element}) {
        this._element = element;
        this._render();

        this._initCatalog();
        this._initViewer();

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

    _render() {
        this._element.innerHTML = `
        <div class="row"></div>

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
  
          <section>
            <p>Shopping Cart</p>
            <ul>
              <li>Phone 1</li>
              <li>Phone 2</li>
              <li>Phone 3</li>
            </ul>
          </section>
        </div>

        <!--PHONES CATALOG-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
  
       
        
        `;
    }
}


import PhoneService from './services/phone-service.js';
import PhoneCatalog from './components/phone-catalog.js';

// это компонент, управляющий страницей телефона
'use strict'

export default class PhonesPage{

    constructor({element}) {
        this._element = element;
        this._render();

        new PhoneCatalog({
          element: this._element.querySelector('[data-component="phone-catalog"]'),
          phones: PhoneService.getPhones(),
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
        </div>
  
       
        
        `;
    }
}

import Component from "../../component.js";

'use strict'

export default class PhoneCatalog extends Component{

    constructor({element, phones, onPhoneSelected}) {
        //в объекте создается св-во element со значением из переменной element
        super({element: element});

        // this._element = element; -> происходит в родительском классе
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;

        // onPhoneSelected - функция, вызывается каждый раз, когда каждый раз происходит клик на телефоне
        this._onPhoneSelected = onPhoneSelected;

        this._render();

        // => чтобы this не был div а li
        //event нужен только для фнкции-стрелки. раньше addEventListener создавал ее сам, но когда есть =>, надо передавать event вручную
        this._element.addEventListener('click', (event) => this._onPhoneClick(event));
    }

    _onPhoneClick(event) {
      let phoneElement = event.target.closest('[data-element="phone"]');
      if(!phoneElement) {
        return;
      }
      // сообщаем странице, с каким id выбран телефон. id телефона в кач-ве параметра
      this._onPhoneSelected(phoneElement.dataset.phoneId);
    }

    _render() {
        this._element.innerHTML = `
          <ul class="phones">
            ${               
              //тут перебираются тел-ы, потом для каждого из них создается строка текста, потом весь массив будет объединен join
              this._phones.map(phone => `
              
                <li 
                  class="thumbnail" 
                  data-element="phone" 
                  data-phone-id="${ phone.id }"
                >
                    <a href="#!/phones/${ phone.id }" class="thumb">
                      <img alt="${ phone.name }" src="${ phone.imageUrl }">
                    </a>
        
                    <div class="phones__btn-buy-wrapper">
                      <a class="btn btn-success">
                        Add
                      </a>
                    </div>
        
                    <a href="#!/phones/${ phone.id }">${ phone.name }</a>
                    <p>${ phone.snippet }</p>
                </li>

              `).join('') }
            </ul>
        `;
    }
}


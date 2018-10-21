import Component from "../../component.js";

'use strict'

export default class PhoneCatalog extends Component{

    //onPhoneSelected = ()=> {} значение по умолчанию
    constructor({element, phones}) {
        //в объекте создается св-во element со значением из переменной element
        super({element: element});

        // this._element = element; -> происходит в родительском классе
        this._phones = phones;
        
        // onPhoneSelected - функция, вызывается каждый раз, когда каждый раз происходит клик на телефоне
        // сохраняем ее во внутреннее св-во каталога
        // this._onPhoneSelected = onPhoneSelected;

        this._render();

        // => чтобы this не был div а li
        //event нужен только для фнкции-стрелки. раньше addEventListener создавал ее сам, но когда есть =>, надо передавать event вручную
        // при выборе телефона
        // СТАНДАРТНЫЕ события можно слушать только внутри компонента
        // this._element.addEventListener('click', (event) => {
        //   this._onPhoneDetailsLinkClick(event);
        // });

        // после создания _on, addEventListener стал не нужен
        this._on('click', 
        'phone-details-link',
        (event) => {
          this._onPhoneDetailsLinkClick(event);
        }
        );

        this._on('click', 
        'add-button',
        (event) => {
          this._onAddClick(event);
        }
        );

    }
    _onPhoneDetailsLinkClick(event) {
      let phoneElement = event.target.closest('[data-element="phone"]');
      // if(!phoneDetailsLink) {
      //   return;
      // }
      // сообщаем странице, с каким id выбран телефон. id телефона в кач-ве параметра
      // this._onPhoneSelected(phoneElement.dataset.phoneId);

      // let phoneElement = event.target.closest('[data-element="phone-link"]');
      // при вызове: на корневом эл-те каталога сгенерируется событие: phoneSelected
      // когда вызывается emit, на самом деле на корневом эл-те вызывается eventName, а в кач-ве деталей передаются наши данные
      this.emit('phoneSelected', phoneElement.dataset.phoneId)

    }

    _onAddClick(event) {
      // let addButton = event.target.closest('[data-element="add-button"]');
      // if(!addButton) {
      //   return;
      // }
      let phoneElement = event.target.closest('[data-element="phone"]');
      
      this.emit('add', phoneElement.dataset.phoneId)
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
                    <a 
                      data-element="phone-details-link" 
                      href="#!/phones/${ phone.id }" class="thumb">
                      <img alt="${ phone.name }" src="${ phone.imageUrl }">
                    </a>
        
                    <div class="phones__btn-buy-wrapper">
                      <a class="btn btn-success" data-element="add-button">
                        Add
                      </a>
                    </div>
        
                    <a 
                    data-element="phone-details-link" 
                    href="#!/phones/${ phone.id }">${ phone.name }</a>
                    <p>${ phone.snippet }</p>
                </li>

              `).join('') }
            </ul>
        `;
    }
}


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
        this._element.addEventListener('click', (event) => 
          this._onPhoneClick(event));
    }

    // создадим публичный метод, на который можно подписываться
    subscribe(eventName, callback) {
      this._element.addEventListener(eventName, (event) => {
        // передаются детали из emit
        callback(event.detail);
      });
    }
    
    //метод для генерации событий
    emit(eventName, data) {
      const event = new CustomEvent(eventName, {
        detail: data
      });
      //событие генерируется на _element
      this._element.dispatchEvent(event);
    }

    _onPhoneClick(event) {
      let phoneElement = event.target.closest('[data-element="phone"]');
      if(!phoneElement) {
        return;
      }
      // сообщаем странице, с каким id выбран телефон. id телефона в кач-ве параметра
      // this._onPhoneSelected(phoneElement.dataset.phoneId);

      // при вызове: на корневом эл-те каталога сгенерируется событие: phoneSelected
      // когда вызывается emit, на самом деле на корневом эл-те вызывается eventName, а в кач-ве деталей передаются наши данные
      this.emit('phoneSelected', phoneElement.dataset.phoneId)


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


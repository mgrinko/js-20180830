// базовый класс с функциональностью для всех компонентов

const CLASS_HIDDEN = 'js-hidden';

export default class Component{

    constructor({element}) {
        this._element = element;

    }
    hide() {
        this._element.classList.add(CLASS_HIDDEN);
    }

    show() {
        this._element.classList.remove(CLASS_HIDDEN);
    }

    _on(eventName, elementName, callback) {
        this._element.addEventListener(eventName, (event) => {
          let delegateTarget = event.target.closest(`[data-element="${elementName}"]`);
           if (!delegateTarget) {
            return;
          }
           callback(event);
        });
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

    // используется вместо addEventListener
    // он так же проверяет делегирование, тк здесь передается selector
    // по сути то же делает метод subscribe, только без делегирования
    _on(eventName, selector, callback) {
        // this._element.addEventListener(eventName, callback); // по сути то же самое что и ниже
        this._element.addEventListener(eventName, (event) => {
          let delegateTarget = event.target.closest(selector);
          
          if(!delegateTarget) {
            return;
          }
          callback(event);
  
        });
      }
  
}

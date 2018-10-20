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
}

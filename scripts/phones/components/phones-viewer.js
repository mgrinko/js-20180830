import Component from "../../component.js";

'use strict'

export default class PhoneViewer extends Component{

    constructor({element}) {

        super({element: element});
        // this._element = element; -> происходит в родительском классе
        
    }

    //переопределение метода show()
    show(phoneDetails) {
        this._phone = phoneDetails;
        this._render();

        super.show();
    }

    _render() {
        // можно было бы писать this._phone.images  и тп
        // чтобы получить сразу несколько св-в из одного объекта
        const { images, name, description } = this._phone;
    
        this._element.innerHTML = `
          <img class="phone" src="${ images[0] }">
          <button data-element="back-button">
            Back
          </button>
          
          <button data-element="add-button">
            Add to basket
          </button>
      
          <h1>${ name }</h1>
      
          <p>${ description }</p>
      
          <ul class="phone-thumbs">
            ${ images.map(image => `
              <li>
                <img src="${ image }">
              </li>
            `).join('')}
          </ul>
        `;
    }

}


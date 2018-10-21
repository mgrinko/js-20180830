import Component from '../../component.js'

export default class PhoneCatalog extends Component {
  constructor({ element, phones, onPhoneSelected }) {
    super({ element });

    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      this._onPhoneClick(event);
    });
  }

  _onPhoneClick (event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    this._onPhoneSelected(phoneElement.dataset.phoneId)
  }
  
    _render() {
      let list = document.createElement('ul')

      this._phones.forEach(phone => {
        list.innerHTML += `
       <li
         style="height:120px"
         class="thumbnail"
         data-element="phone"
         data-phone-id="${ phone.id }"
        >
         <a href="#!/phones/${ phone.id }" class="thumb" style="margin: 5px 10px;">
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
        `
      });
      this._element.append(list)
    }
}

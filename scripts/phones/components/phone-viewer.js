import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor({ element, onBackClicked }) {
    super({ element });
    this._onBackClicked = onBackClicked;
    this._element = element;
    this._element.addEventListener('click', this._onImageClick);
    this._element.addEventListener('click', this._handleBackClick.bind(this));
  }


  show(phoneDetails) {
    this._phone = phoneDetails;
    this._render();
  }

    _handleBackClick(event) {
        if ( event.target.tagName === 'BUTTON') {
            this._onBackClicked();
           // this._unmountEventListeners();
        }
        return;
    }

    _onImageClick(event) {
    let target = event.target;
    let large_img =document.querySelector('.large-img');

    if (target.parentNode.parentNode.className != 'phone-thumbs') {
      return;
    }

        if (large_img.src !== target.src )  {
            large_img.src =target.src;
        }
    }

    _render() {

        console.log( this._phone )
        this._element.innerHTML = `
           <img class="phone large-img" src="${this._phone.images[0]}">      
           <button>Back</button>      
           <button>Add to basket</button>
           
            <h1>${this._phone.name}</h1>
            <p>${this._phone.description}</p>
            <ul class="phone-thumbs">
            ${this._phone.images.map(image => `
            
            <li>
              <img src=${image}>
            
            </li>
            
            
            `).join('')}
            </ul>
       
   
         `;
    }

}

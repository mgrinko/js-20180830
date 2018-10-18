import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor({ element, ...rest }) {
    super({ element });
    
    this._events = {
      "onClickPreview": function(event) {
        this._currentImage = event.target.src;
        this._render();
      },
      ...rest
    }
    
    this._element.addEventListener('click', (event) => {
      if ("event" in event.target.dataset && typeof this._events[event.target.dataset.event] === "function") {
        this._events[event.target.dataset.event].call(this, event)
      }
    })
  }

  show(phoneDetails, imageSrc) {
    this._phone = phoneDetails;
    this._images = phoneDetails.images;
    this._currentImage = imageSrc || phoneDetails.images[0];
    this._render();
  }

  _render() {
    let {name, description} =  this._phone;
    let image = this._currentImage ? `<img class="phone" src="${this._currentImage}" alt="">`: "";
    
    this._element.innerHTML = `
      ${image}

      <button data-event="onBackToCatalog">Back</button>
      <button>Add to basket</button>
  
  
      <h1>${name}</h1>
  
      <p>${description}</p>
  
      <ul class="phone-thumbs">
        ${this._images.map(image => `<li>
          <img src="${image}" alt="" data-event="onClickPreview"/>
          </li>`).join("")}
      </ul>
    `;
  }
}

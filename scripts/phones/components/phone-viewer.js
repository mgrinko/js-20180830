import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor({ element }) {
    super({ element });

    this._on('click', 'back-button', () => {
      this.emit('back');
    });

    this._on('click', 'add-button', () => {
      this.emit('add', this._phone.id);
    });

    this._on('click', 'gallery-image', (event) => {
      this.emit('change-photo', event.target.src)
     // console.log(event.target.src)
    });
  }

  show(phoneDetails) {
    this._phone = phoneDetails;
    this._render();

    super.show();
  }


  imageGallery (image) {
    let largeImage = this._element.querySelector('[data-element="large-gallery-image"]');

    if (largeImage.src !== image ){
      largeImage.src = image
    }

  }

  _render() {
    const { images, name, description } = this._phone;

    this._element.innerHTML = `
      <img class="phone" data-element="large-gallery-image" src="${ images[0] }">

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
            <img data-element="gallery-image" src="${ image }">
          </li>
        `).join('')}
      </ul>
    `;
  }
}

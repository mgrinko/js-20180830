import Component from '../../component.js'

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._render(this._phones);

    this.sort('name');


    this._on('click', 'phone-details-link', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phoneSelected', phoneElement.dataset.phoneId);
    });

    this._on('click', 'add-button', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('add', phoneElement.dataset.phoneId);
    });
  }

  filter(searchStr) {
    let list = this._phones;

    if(searchStr){
      let regex = new RegExp(searchStr, 'i');
      list = this._phones.filter((phone) => {
          return phone.name.search(regex) !== -1;
      });
    }

    this._render(list);
  }

  sort(sortDir) {
    if(sortDir === 'name') {
        this._phones.sort(PhoneCatalog.sortByName);
    } else if(sortDir === 'age') {
        this._phones.sort(PhoneCatalog.sortByAge);
    }

    this._render(this._phones);
  }

  static sortByName(a, b) {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
  }

  static sortByAge(a, b) {
      if(a.age < b.age) { return -1; }
      if(a.age > b.age) { return 1; }
  }

  _render(phones) {
    if (phones.length > 0) {
      this._element.innerHTML = `
        <ul class="phones">
          ${ phones.map(phone => `
            <li
              class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }"
            >
              <a
                href="#!/phones/${ phone.id }"
                class="thumb"
                data-element="phone-details-link"
              >
                <img alt="${ phone.name }" src="${ phone.imageUrl }">
              </a>
    
              <div class="phones__btn-buy-wrapper">
                <a class="btn btn-success" data-element="add-button">
                  Add
                </a>
              </div>
    
              <a
                href="#!/phones/${ phone.id }"
                data-element="phone-details-link"
              >
                ${ phone.name }
              </a>
              
              <p>${ phone.snippet }</p>
            </li>
          `).join('') }
        </ul>`;
    } else {
        this._element.innerHTML = 'Ничего не найдено';
    }

  }
}

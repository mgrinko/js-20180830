import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._on('change', 'phones-sorting', () => {
      this.emit('initFilter', event.target.value);
    });

    this._on('input', 'phone-search', () => {
      this.emit('initFilter', event.target.value);      
    });
  }

  initValue() {
    let phoneSearch = this._element.querySelector('[data-element="phone-search"]').value;
    let phonesSort = this._element.querySelector('[data-element="phones-sorting"]').value;

    return {
      phoneSearch,
      phonesSort
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="phone-search"
          type="text"
        >
      </p>

      <p>
        Sort by:
        <select data-element="phones-sorting">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}

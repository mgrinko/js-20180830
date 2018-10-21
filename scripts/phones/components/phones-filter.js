import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._timerId = null;
    this._render();

    this._on('change', 'sort-button', (event) => {
        let sortElement = event.target.closest('[data-element="sort-button"]');

        this.emit('sort', sortElement.value);
    });

    this._on('input', 'search-input', (event) => {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(() => {
          let sortElement = event.target.closest('[data-element="search-input"]');
          this.emit('filter', sortElement.value);
      }, 1000)
    });
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input
          data-element="search-input"
          type="text"
        >
      </p>

      <p>
        Sort by:
        <select data-element="sort-button">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}

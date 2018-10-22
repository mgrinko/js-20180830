import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._on('change', 'sort-select', (event) => {
      this.emit('sort', event.target.value);
    });

    this._on('input', 'search', (event) => {
      this.emit('search', event);
    });

    this._render();
  }

  getKeys(){
    let query = this._element.querySelector("[data-element = 'search']").value;
        query = query.length < 3 ? "" : query;
    const sortkey = this._element.querySelector("[data-element = 'sort-select']").value;

    return {
      sortkey: sortkey,
      query: query,
    }
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search"
          type="text"
        >
      </p>

      <p>
        Sort by:
        <select data-element="sort-select">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}

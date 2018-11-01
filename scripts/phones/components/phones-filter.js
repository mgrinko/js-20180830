import Component from '../../component.js';
import { debounce } from 'lodash';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._on('input', 'text-field', debounce(
      (event) => { console.log(event.target.value);},
      1000
    ));
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input
          data-element="text-field"
          type="text"
        >
      </p>

      <p>
        Sort by:
        <select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}

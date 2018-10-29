import Component from '../../component.js';
import templateFunction from './phone-catalog.hbs';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._on('click', 'phone-details-link', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phoneSelected', phoneElement.dataset.phoneId);
    });

    this._on('click', 'add-button', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('add', phoneElement.dataset.phoneId);
    });
  }

  show(phones) {
    this._phones = phones;
    this._render();

    super.show();
  }

  _render() {
    this._element.innerHTML = templateFunction({
      phones: this._phones,
    });
  }
}

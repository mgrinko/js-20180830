export default class PhoneFilter {
  constructor(props) {
    let {
      element,
      onOptionChange,
    } = props;

    this._element = element;
    this._onOptionChange = onOptionChange;
    this._filterChoice = 'name';
    this._mountEventListeners();
    this._render();
  }

  _mountEventListeners() {
    this._element.addEventListener('click', (event) => {
      if ( event.target.value ) {
        let nextOption = event.target.value;
        this._filterChoice = nextOption;
        this._onOptionChange(nextOption);
      }
    });
  }

  _renderOptions() {
    return (`
      <select>
        <option value="name">Alphabetical</option>
        <option value="age">Newest</option>
      </select>
    `)
  }

  _render() {
    this._element.innerHTML = `${ this._renderOptions() }`
  }
}
export default class PhoneSearch {
  constructor(props) {
    let {
      element,
      onInputChange,
    } = props;

    this._element = element;
    this._onInputChange = onInputChange;
    this._handleInputChange = this._throttle(this._onInputChange, 1000);
    this._mountEventListeners();

    this._render();
  }

  _mountEventListeners() {
    this._element.addEventListener('input', (event) => {
      this._handleInputChange(event.target.value)
    })
  }

  _throttle(decoratee, delay) {
    let isDelayed = false;
    let recentArgs = null;
    let recentThis = null;

    return function wrapper(...args) {
      recentArgs = args;
      recentThis = this;

      if (isDelayed) {
        return;
      }

      isDelayed = true;

      setTimeout(() => {
        isDelayed = false;
        if ( recentArgs !== null ) {
          wrapper(...recentArgs);
        }
      }, delay);

      let result = decoratee.apply(recentThis, recentArgs);
      recentArgs = null;
      return result;
    }
  }

  _render() {
    this._element.innerHTML = `<input>`
  }
}
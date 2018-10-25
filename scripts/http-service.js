const API_URL = 'https://mgrinko.github.io/js-20180830';
// const API_URL = 'http://localhost:3000'

class MyPromise {
  constructor (executor) {
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._status = 'pending';
    this._result = undefined;

    executor(this._resolve.bind(this), this._reject.bind(this));
  }

  then(successCallback) {
    if (this._status === 'pending') {
      this._successCallbacks.push(successCallback);
    } else {
      successCallback(this._result);
    }
  }

  catch(errorCallback) {
    if (this._status === 'pending') {
      this._errorCallbacks.push(errorCallback);
    } else {
      errorCallback(this._result);
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;

    this._successCallbacks.forEach(callback => {
      callback(data);
    });
  }

  _reject(error) {
    this._status = 'rejected';
    this._result = error;

    this._errorCallbacks.forEach(callback => {
      callback(error);
    });
  }
}

const HttpService = {
  sendRequest(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let method = 'GET';

      xhr.open(method, `${API_URL}/api/${url}`, true);

      xhr.send();

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject( xhr.status + ': ' + xhr.statusText );
        } else {
          let data = JSON.parse(xhr.responseText);

          resolve(data);
        }
      };
    });
  }
};

export default HttpService;

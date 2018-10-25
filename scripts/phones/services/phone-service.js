import HttpService from '../../http-service.js'

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('phones.json', callback);
  },

  getPhone(phoneId, callback) {
    let promise = this._sendRequest(`phones/${phoneId}.json`);

    // promise.then(callback);

    promise.then((data) => {
      console.log(data);
    });

    promise.then((data) => {
      console.log(123);
    });
  },


  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],

      then(successCallback) {
        this._successCallbacks.push(successCallback);
      },

      resolve(data) {
        this._successCallbacks.forEach(callback => {
          callback(data);
        });
      }
    };

    HttpService.sendRequest(url, (data) => {
      promise.resolve(data);
    });

    return promise;
  }
};

export default PhoneService;

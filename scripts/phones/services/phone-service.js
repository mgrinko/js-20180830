import HttpService from '../../http-service.js'

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('phones.json', callback);
  },

  getPhone(phoneId, callback) {
    let promise = this._sendRequest(`phones/${phoneId}.json`);

    promise.then(callback);
  },


  _sendRequest(url) {
    let promise = {
      then(successCallback) {
        this.successCallback = successCallback;
      },

      resolve(data) {
        this.successCallback(data);
      }
    };

    HttpService.sendRequest(url, (data) => {
      promise.resolve(data);
    });

    return promise;
  }
};

export default PhoneService;

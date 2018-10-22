import HttpService from '../../http-service.js'

const PhoneService = {
  getPhones(callback) {
    HttpService.sendRequest('phones.json', {
      successCallback: callback,
    });
  },

  getPhone(phoneId, callback) {
    HttpService.sendRequest(`/api/phones/${phoneId}.json`, {
      successCallback: callback,
    });
  },
};

export default PhoneService;

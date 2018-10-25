import HttpService from '../../http-service.js'

const PhoneService = {
  getPhones() {
    return HttpService.sendRequest('phones.json');
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`asasdasdphones/${phoneId}.json`);
  },
};

export default PhoneService;

import HttpService from '../../http-service.js'

const PhoneService = {
  async getPhones({ query, orderField } = {}) {
    let phones = await HttpService.sendRequest('phones.json');

    return phones
      // .filter(phone => phone.name.includes(query))
      // .sort((phoneA, phoneB) => {
      //   return phoneA[orderField] > phoneB[orderField]
      //     ? 1
      //     : -1;
      // });
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },
};

export default PhoneService;

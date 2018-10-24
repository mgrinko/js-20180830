import HttpService from '../../http-service.js';

const PhoneService = {
  getPhones(filters, callback) {
    HttpService.sendRequest('phones.json', {
      successCallback: (data) => {
        const {phoneSearch, phonesSort} = filters;
        
        let dataFiltered = data.filter((phone) => phone.name.toLowerCase().includes(phoneSearch.toLowerCase()))
                               .sort((phoneA, phoneB) => {
                                  if (phoneA[phonesSort] > phoneB[phonesSort]) return 1;
                                  if (phoneA[phonesSort] < phoneB[phonesSort]) return -1;
                            });
        
        callback(dataFiltered);
      },
    });
  },

  getPhone(phoneId, callback) {
    HttpService.sendRequest(`phones/${phoneId}.json`, {
      successCallback: callback,
    });
  },
};

export default PhoneService;

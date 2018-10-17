class Store {
  constructor({ storeItem }) {
    this._storeItem = storeItem;
    this[storeItem] = [];
  }

  initStore(data) {
    this[this._storeItem] = data;
  }

  addItem(data) {
    this[this._storeItem].push(data);
  }

  removeItem(data) {
    let dataIndex = this[this._storeItem].indexOf(data);
    if ( dataIndex > -1 ) {
      this[this._storeItem].splice(dataIndex, 1);
    }
    return;
  }

  getItems() {
    return this[this._storeItem]
  }

  clear() {
    this[this._storeItem] = [];
  }
}

class PhonesStore extends Store {
  constructor(props) {
    super(props);

    let {
      storeItem,
      phones = []
    } = props;

    this._storeItem = storeItem;
    this._filteredPhones = [];

    this.initStore(phones);
  }

  getItems() {
    this._filteredPhones = super.getItems();
    return this._filteredPhones;
  }

  getPhone(phoneId) {
    if ( !this._storeItem ) {
      throw Error('No phones are available');
      return;
    }

    if ( !phoneId ) {
      console.log('---', 'No phoneId provided to getPhone method');
      return;
    }

    let requiredPhone = {};

    for ( let phone of this.getItems() ) {
      if ( phone && ( phone.id === phoneId ) ) {
        requiredPhone = phone;
        break;
      }
    }

    return requiredPhone;
  }

  filterPhones(value) {
    this._filteredPhones = super.getItems().filter((phone) => (
      ( (phone.name + '').toLowerCase().includes((value + '').toLowerCase()) )
        ? true
        : false
    ));
    return this._filteredPhones;
  }

  sortPhones(option) {
    switch(option) {
      case 'name':
        this._filteredPhones = this._filteredPhones.sort((phone1, phone2) => {
          let name1 = (phone1.name + '').toLowerCase();
          let name2 = (phone2.name + '').toLowerCase();

          if ( name1 < name2 ) {
            return -1;
          } else if ( name1 > name2 ) {
            return 1;
          } else return 0;
        })
        break;
      case 'age':
        this._filteredPhones = this._filteredPhones.sort((phone1, phone2) => {
          let age1 = phone1.age;
          let age2 = phone2.age;

          if ( age1 < age2 ) {
            return -1;
          } else if ( age1 > age2 ) {
            return 1;
          } else return 0;
        })
        break;
      default:
        break;
    }

    return this._filteredPhones;
  }
}

let cartStore = new Store({
  storeItem: 'cart',
});

export default cartStore;

export let phonesStore = new PhonesStore({
  storeItem: 'phones',
  phones: [],
})
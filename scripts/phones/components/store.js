class Store {
  constructor({ storeItem }) {
    this._storeItem = storeItem;
    this[storeItem] = [];
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

let cartStore = new Store({
  storeItem: 'cart',
});

export default cartStore;
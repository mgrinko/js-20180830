class Store {
  constructor({ storeItem }) {
    this._storeItem = storeItem;
    this[storeItem] = [];
  }

  addItem(data) {
    this[this._storeItem].push(data);
  }

  removeItem(storeItem, data) {
    console.log("---", "remove from storeItem, data:", storeItem, data);
  }

  getItems(storeItem) {
    return this[this._storeItem]
  }

  clear(storeItem) {
    this[this._storeItem] = [];
  }
}

let cartStore = new Store({
  storeItem: 'cart',
});

export default cartStore;
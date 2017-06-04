import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend({
  setPlayer(player) {
    this.clear();
    // This is not super secure
    Object.keys(player).forEach((key) => {
      this.set(key, player[key]);
    });
  }
});

// Storage.reopenClass({
//   initialState() {
//     return {};
//   }
// });

export default Storage;

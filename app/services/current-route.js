import Ember from 'ember';

const { computed, getOwner } = Ember;

export default Ember.Service.extend({
  init(...args) {
    this._super(args);
    this.set('applicationController', getOwner(this).lookup('controller:application'));
  },
  currentPath: computed.alias('applicationController.currentPath'),
  currentRouteName: computed.alias('applicationController.currentRouteName')
});

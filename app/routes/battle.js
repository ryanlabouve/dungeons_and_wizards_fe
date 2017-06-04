import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  player: storageFor('player'),
  model() {
    return this.get('player');
  },

  afterModel(model) {
    if (!model.get('id')) {
      this.transitionTo('players');
    }
  }
});

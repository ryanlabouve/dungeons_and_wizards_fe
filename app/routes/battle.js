import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  playerStorage: storageFor('player'),
  model() {
    return this.get('playerStorage');
  },

  afterModel(model) {
    if (!model.get('id')) {
      this.transitionTo('players');
    }
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('player', model);
  }
});

import Ember from 'ember';
import fetch from 'fetch';
import config from '../../config/environment';

export default Ember.Route.extend({
  model() {
    return fetch(`${config.apiHost}/players`).then(function(response) {
      return response.json();
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('players', model);
  }
});

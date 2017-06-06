import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import fetch from 'fetch';
import config from '../config/environment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Route.extend({
  playerStorage: storageFor('player'),
  model() {
    let battle = fetch(`${config.apiHost}/battle`).then(function(response) {
      return response.json();
    });

    let recentActivities = fetch(`${config.apiHost}/activities`).then(function(response) {
      return response.json();
    });

    let player = this.get('playerStorage');

    return Ember.RSVP.hash({
      player,
      battle,
      recentActivities,
    });
  },

  afterModel(model) {
    if (!model.player.get('id')) {
      this.transitionTo('players');
    }
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('player', model.player);
    controller.set('battle', model.battle);
    controller.set('recentActivities', model.recentActivities);
    this.get('pollServerForChanges').perform();
  },

  pollServerForChanges: task(function*() {
    let victory = null;
    while(!victory) {
      victory = Ember.get(this, 'controller.model.battle.victory_at');
      if (victory) { break; }
      yield timeout(2000);
      this.refresh();
    }
  }).cancelOn('deactivate').restartable()
});

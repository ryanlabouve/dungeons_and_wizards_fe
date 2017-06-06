import Ember from 'ember';
import config from '../config/environment';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  queuedActions: [],
  stageAction: task(function*(move) {
    let moveResponse = yield fetch(`${config.apiHost}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player_id: this.get('player.id'),
        move
      })
    });
    let response = yield moveResponse.json();

    if (response.success) {
      this.get('queuedActions').pushObject(Object.assign({}, move, response));
    } else {
      this.get('queuedActions').pushObject(Object.assign({}, move, response));
    }
  })
});

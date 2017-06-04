import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  playerStorage: storageFor('player'),
  actions: {
    selectCharacterAndJoinBattle() {
      this.get('playerStorage').setPlayer(this.get('player'));
      this.transitionToRoute('battle');
    }
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToPlayer(player) {
      this.transitionToRoute('players.show', player);
    }
  }
});

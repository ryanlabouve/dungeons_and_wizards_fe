import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  _cachedHealthPercentage: null,

  healthPercentage: Ember.computed('battle.hp_total', 'battle.damage_total', function() {
    let hp = Number.parseInt(this.get('battle.hp_total'));
    let damage = Number.parseInt(this.get('battle.damage_total'));
    let percentage = ((hp -damage) / hp) * 100;
    return percentage;
  }).readOnly(),

  oneForthsDead: Ember.computed.lt('healthPercentage', 76),
  halfDead: Ember.computed.lt('healthPercentage', 51),
  threeForthsDead: Ember.computed.lt('healthPercentage', 26),
  almostDead: Ember.computed.lt('healthPercentage', 11),
  dead: Ember.computed.lt('healthPercentage', 1),


  recentlyAttacked: Ember.computed('healthPercentage', function() {
    if (!this.get('_cachedHealthPercentage')) {
      this.set('_cachedHealthPercentage', this.get('healthPercentage'));
      return false;
    }

    if (this.get('_cachedHealthPercentage') !== this.get('healthPercentage')) {
      // side-effect
      this.set('_cachedHealthPercentage', this.get('healthPercentage'));
      return true;
    } else {
      return false;
    }
  })
});

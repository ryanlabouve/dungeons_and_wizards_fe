import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  healthPercentage: Ember.computed('battle.hp_total', 'battle.damage_total', function() {
    let hp = Number.parseInt(this.get('battle.hp_total'));
    let damage = Number.parseInt(this.get('battle.damage_total'));
    let percentage = (damage / hp) * 100;
    return `${percentage}%`;
  }).readOnly()
});

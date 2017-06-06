import Ember from 'ember';
import moment from 'moment';

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

  startToEnd: Ember.computed('battle.created_at', 'battle.victory_at', function() {
    if (!this.get('dead')) { return }
    let start = moment(this.get('battle.created_at'));
    let end = moment(this.get('battle.victory_at'));

    let seconds = end.diff(start) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    let str = '';

    if (days > 1) { str += `${Math.floor(days)} days `; }
    if (hours > 1) { str += `${Math.floor(hours % 24)} hours `; }
    if (minutes > 1) { str += `${Math.floor(minutes % 60)} minutes `; }
    if (seconds) { str += `${Math.floor(seconds % 60)} seconds `; }

    return str;
  }),


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

import Ember from 'ember';

export default Ember.Controller.extend({
  currentRoute: Ember.inject.service('current-route')
});

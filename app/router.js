import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('players', function() {
    this.route('show', { path: ':id' });
  });
  this.route('battle');
});

export default Router;

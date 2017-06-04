import Ember from 'ember';

export function htmlSafe(params) {
  return new Ember.String.htmlSafe(params.join(''));
}

export default Ember.Helper.helper(htmlSafe);

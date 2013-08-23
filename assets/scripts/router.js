define(function(require) {
  'use strict';
  var log = require('util/log'),
  Backbone = require('backbone'),
  ApplicationRouter = Backbone.Router.extend({
    routes: {
      '' : 'index',
      'about': 'about'
    },
    index: function() {
      log('Hello From Index Route');
    },
    about: function() {
      log('Hello From About Route');
    }
  });
  return ApplicationRouter;
});

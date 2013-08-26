define(function(require) {
  'use strict';
  var Backbone  = require('backbone'),
      log       = require('util/log'),
      IndexView = require('views/index'),
      AboutView = require('views/about'),

  ApplicationRouter = Backbone.Router.extend({
    routes: {
      '' : 'index',
      'about': 'about'
    },
    index: function() {
      log('Hello From Index Route');
      var view = new IndexView();
      view.render();
    },

    about: function() {
      log('Hello From About Route');
      var view = new AboutView();
      view.render();
    }
  });

  return {
    initialize: function() {
      this.router = new ApplicationRouter();
      Backbone.history.start({ pushState: true });
    }
  };
});

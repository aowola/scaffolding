define(function(require) {
  'use strict';
  var Backbone  = require('backbone');
  return {
    navigate: function() {
      return Backbone.history.navigate.apply(Backbone.history, arguments);
    }
  };
});

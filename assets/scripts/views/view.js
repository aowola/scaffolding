define(function(require) {
  'use strict';
  var $         = require('jquery'),
      Backbone  = require('backbone'),

  BaseView = Backbone.View.extend({
    el: '#content',
    initialize: function() {
      // Handle Server Side Render
      this.skipRender = $('html').attr('data-sr') === 'true';
      $('html').removeAttr('data-sr');
      return this;
    },
    shouldRender:function() {
      var render = !this.skipRender;
      if(this.skipRender) {
        this.skipRender = false;
      }
      return render;
    }
  });
  return BaseView;
});



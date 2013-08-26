define(function(require) {
  'use strict';
  var BaseView  = require('views/view'),
      template  = require('templates/templates'),

  AboutView = BaseView.extend({
    template: template['about'],
    render: function() {
      if(this.shouldRender()) {
        this.$el.html(this.template.render({entity:'Client'}));
      }
      return this;
    }
  });
  return AboutView;
});

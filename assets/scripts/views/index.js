define(function(require) {
  'use strict';
  var nav        = require('util/nav'),
      BaseView   = require('views/view'),
      template   = require('templates/templates'),
      
  IndexView = BaseView.extend({
    template: template['index'],
    events: { "click .about" : "about" },
    about: function() { nav.navigate("about", {trigger: true}); },
    render: function() {
      if(this.shouldRender()) {
        this.$el.html(this.template.render({entity:'Client'}));
      }
      return this;
    }
  });
  return IndexView;
});

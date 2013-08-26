(function() {
  'use strict';
  requirejs.config({
    urlArgs:"bust=" + (new Date()).getTime(),
    paths: {
      'jquery':'../lib/jquery/jquery',
      'underscore':'../lib/underscore/underscore',
      'backbone':'../lib/backbone/backbone',
      'hogan':'../lib/hogan/index'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: [
          'underscore',
          'jquery'
        ],
        exports: 'Backbone'
      },
      hogan : {
        exports: 'Hogan'
      }
    }
  });
  require(['app'], function(App) {
    App.initialize();
  });
}());



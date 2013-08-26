define(function(require) {
  'use strict';
  var log       = require('util/log'),
      info      = require('util/info'),
      router    = require('router');

    /* Entry point of application */
    log(info.toString());

    /* Init Application Router */
    return {
      initialize: function() {
        router.initialize();
      }
    };
});

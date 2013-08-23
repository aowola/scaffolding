require(['backbone', 'bootstrap', 'util/log', 'util/info', 'router'],
  function(Backbone, bootstrap, log, info, Router) {
    'use strict';
    /* Entry point of application */
    log(info.toString());

    /* Init Application Router */
    new Router();
    Backbone.history.start();
});

define(function() {
  'use strict';
  return function() {
    if(window.console) {
      window.console.log.apply(window.console, arguments);
    }
  };
});

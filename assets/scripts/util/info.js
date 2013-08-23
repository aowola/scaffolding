define(function() {
  'use strict';
  return {
    'name':'Scaffolding',
    'version':'0.0.0',
    'toString': function() {
      return ('Application: ' + this['name'] + '\\n' +
      'Version: ' + this['version']).replace(/\\n/g,"\n");
    }
  };
});

var url = require('url');

GLOBAL.Hogan    = require('../assets/lib/hogan/index');
var _           = require('../assets/lib/underscore/underscore'),
    templates   = require('./templates');

var _layout = templates['__layout'],
    _load = function(template, out) {
      if(out && templates[template]) {
        out[template] = function (context) {
          if(_layout) {
            extendedContext = _.extend({'isServerRender': true, '_content': templates[template].render(context)}, context);
            return _layout.render(extendedContext);
          } else {
            return templates[template].render(context);
          }
        };
      } else {
        console.log('Failed to load template ' + template);
      }
    };

exports.templateHelper = function(templates) {
  var fns = {};
  for (var i = 0; i < templates.length; ++i) {
    _load(templates[i], fns);
  }
  return fns;
};
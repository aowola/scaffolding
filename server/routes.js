var templateHelper  = require('./templateHelper').templateHelper;
var templates = templateHelper(['index', 'about']);

exports.routes = function(app) {
  app.get('/',function(req, res, next){
    var html = templates['index'];
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html());
    res.end();
  });
  
  app.get('/about',function(req, res, next){
    var html = templates['about'];
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html({entity:"Server"}));
    res.end();
  });
};
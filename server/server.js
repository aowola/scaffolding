var path = require('path');
var express = require('express');
var routes = require('./routes').routes;

// Variables 
var app = express(),
dir = process.argv['public'] || '.tmp',
port = process.env['port'] || process.env['PORT'] || 3000;
dir = path.normalize(__dirname + '/../' + dir);
console.log(dir);
app.use(express.static(dir));

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Initialize Routes
routes(app);

// Start Listening on port
console.log("Starting Service on port: " + port);
app.listen(port);
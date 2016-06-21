var path = require('path');
var express = require('express');
var app = express();
var SERVER = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  console.log("Dev");
  var webpack = require('webpack');
  var config = require('../webpack.config.js');
  var compiler = webpack(config);
  
}

app.use(express.static(path.join(__dirname, '')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
});

app.listen(PORT, SERVER, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
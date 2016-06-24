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
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
});

app.post('/me', function(request,response) {
  console.info(request.body);
  var params = request.body;
  var http = require("http");

  var options = {
    "method": "POST",
    "hostname": "forum.educron.com",
    "port": null,
    "path": "/api/token",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache"
    },
    "params" : params
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      response.send(JSON.parse(body.toString()));
    });
  });

  req.write(JSON.stringify(options.params));
  req.end();
  
});

app.listen(PORT, SERVER, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
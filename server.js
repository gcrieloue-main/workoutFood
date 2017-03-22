var express = require('express');


var app = express();

var rootPath = __dirname;

app.use(express.static(rootPath + '/src'))
app.use('/node_modules', express.static(rootPath + '/node_modules'));

app.get('/', function (req, res) {
  console.log("access to /");
  res.sendFile(rootPath + '/src/index.html');
});

var port = 3000;
var server = app.listen(port, function () {
  console.log("run server on port :" + port);
  console.log("routPath: " + rootPath);
});

module.exports = app;

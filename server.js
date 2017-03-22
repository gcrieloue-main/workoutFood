var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
var rootPath = path.normalize(__dirname);
var appPath = rootPath + "/src";

app.use(express.static(appPath);
app.use('/node_modules', express.static(rootPath + '/node_modules'));

app.get('/', function (req, res) {
  console.log("access to /");
  res.sendFile(appPath + '/index.html');
});

var server = app.listen(port);

console.log("run server on port :" + port);
console.log("routPath: " + rootPath);
console.log("appPath: " + appPath);

module.exports = app;

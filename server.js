var express = require('express');
var path = require('path');
var app = express();
var port = 8080;
var rootPath = path.normalize(__dirname);
var appPath = rootPath + "/src";

app.use(express.static(appPath));
app.use('/node_modules', express.static(rootPath + '/node_modules'));

app.get('/*', function (req, res) {
  res.sendFile(appPath + '/index.html');
});

var server = app.listen(port);

console.log("run server on port :" + port);
console.log("routPath: " + rootPath);
console.log("appPath: " + appPath);

module.exports = app;

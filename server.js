var express = require('express');
var path = require('path');
var app = express();
var port = 8080;
var rootPath = path.normalize(__dirname);
var appPath = rootPath + "/aot";

app.use(express.static(appPath));
app.use('/fonts', express.static(rootPath + '/src/assets/fonts'));
app.use('/assets/fonts', express.static(rootPath + '/src/assets/fonts'));
app.use('/img', express.static(rootPath + '/src/assets/img'));
app.use('/assets/img', express.static(rootPath + '/src/assets/img'));
app.use('/sitemap.xml', express.static(rootPath + '/sitemap.xml'));
app.get('/*', function (req, res) {
  res.sendFile(appPath + '/index.html');
});

var server = app.listen(port);

console.log("run server on port: " + port);
console.log("rootPath: " + rootPath);
console.log("appPath: " + appPath);

module.exports = app;

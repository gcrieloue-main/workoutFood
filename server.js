var express = require('express');


var app = express();

var rootPath = __dirname;

app.use(express.static(rootPath + '/client/app'))
app.use('/node_modules', express.static(rootPath + '/node_modules'));

var server = app.listen(3000, function () {
  // shows the connection etc
});

module.exports = app;

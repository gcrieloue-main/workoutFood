var express = require('express');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var rootPath = __dirname;

app.use(express.static(rootPath + '/client/app'))
app.use('/node_modules', express.static(rootPath + '/node_modules'));

var server = app.listen(3000, function () {
  // shows the connection etc
});

module.exports = app;

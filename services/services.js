var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = config.services.port;
var router = express.Router();

function mongoExec(cmd) {
  MongoClient.connect(config.mongodb.db, function (error, db) {
    if (error) return funcCallback(error);

    console.log("Connecté à la base de données 'tutoriel'");
    cmd(db);
  });
}

router
  .post('/menus/save', function (req, res) {
    mongoExec(function (db) {
      var obj = {};
      var email = req.header("X-header-email");
      var token = req.header("X-header-token");
      obj.menu = req.body;
      obj.email = email;
      db.collection("col").insert(obj, null, function (error, results) {
        if (error) throw error;
        console.log("obj " + JSON.stringify(obj) + " added");
      });
      res.json(obj);
    });
  })
  .get('/menus/list', function (req, res) {
    mongoExec(function (db) {
      db.collection("col").find().toArray(function (error, results) {
        res.json(results);
      });
    });
  })
  .get('/menus/:menu_id', function (req, res) {
    mongoExec(function (db) {
      console.log("retrieving menu " + req.params.menu_id);
      db.collection("col").findOne({_id: req.params.menu_id}, function (error, result) {
        res.json(result);
      });
    })
  });


app.use('/api', router);
app.listen(port);
console.log("listening on " + port);

var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

function mongoExec(cmd) {
  MongoClient.connect("mongodb://localhost/tutoriel", function (error, db) {
    if (error) return funcCallback(error);

    console.log("Connecté à la base de données 'tutoriel'");
    cmd(db);
  });
}

router
  .get('/test', function () {
    mongoExec(function (db) {
      var obj = {nom: "truc", bidule: "bidule"};
      db.collection("col").insert(obj, null, function (error, results) {
        if (error) throw error;
        console.log("obj " + obj.nom + " added");
      });

      db.collection("col").find().toArray(function (error, results) {
        results.forEach(function (obj, i) {
          console.log(i + "/" + obj.nom);
        });
      });
    });
  })
  .post('/save', function (req, res) {
    mongoExec(function (db) {
      var obj = req.body;
      console.log("body: " + JSON.stringify(obj));
      db.collection("col").insert(obj, null, function (error, results) {
        if (error) throw error;
        console.log("obj " + JSON.stringify(obj) + " added");
      });
    });
  })
  .get('/list', function (req, res) {
    db.collection("col").find().toArray(function (error, results) {
      results.forEach(function (obj, i) {
        console.log(i + "/" + obj.nom);
      });
      res.json(results);
    });
  });


app.use('/api', router);
app.listen(port);
console.log("listening on " + port);

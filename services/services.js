var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/test',function(){
    MongoClient.connect("mongodb://localhost/tutoriel", function(error, db) {
        if (error) return funcCallback(error);

        console.log("Connecté à la base de données 'tutoriel'");
        var obj={nom:"truc",bidule:"bidule"};
        db.collection("col").insert(obj,null,function(error,results){
            if (error) throw error;
            console.log("obj "+obj.nom+" added");
        });

        db.collection("col").find().toArray(function (error, results){
            results.forEach(function(obj,i){
                console.log(i+"/"+obj.nom);
            });
        });
    });
});

app.use('/api',router);
app.listen(port);
console.log("listening on "+port);

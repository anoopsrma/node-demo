
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect("mongodb://localhost:27017/node", function(err, database) {
    if(err) throw err;
    db = database;
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/', function (req, res, next) {
  	db.collection('about').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
});


router.get('/about', function(req, res, next) {
  db.collection('about').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('about.hbs', {quotes: result})
  })
});

module.exports = router;

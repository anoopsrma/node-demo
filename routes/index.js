var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/add-post', function (req, res, next) {
  if (req.body.email && req.body.pwd) {
    db.collection('about').insert( { email: req.body.email, pwd: req.body.pwd } , (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
  })
}
  res.redirect('/add-post')
});

router.post('/login', function (req, res, next) {

   db.collection('about').find({ email: req.body.email, pwd: req.body.pwd}).toArray((err, result) => {
    if (err) return console.log(err)
    if (result.length === 1) {
        res.render('about.hbs', {quotes: result})
    } else {
        res.render('login', { title: 'Login' });
    }
  })
});


router.get('/about', function(req, res, next) {
  var db = req.db
  db.collection('about').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('about.hbs', {quotes: result})
  })
});

router.get('/add-post', function(req, res, next) {
  res.render('add_post', { title: 'Add Post' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;

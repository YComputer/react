var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var COMMENTS_FILE = path.join(__dirname, '..', 'comments.json');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get comments
router.get('/api/comments', function (req, res, next) {
  console.log('in get comments !!!!!!',COMMENTS_FILE);
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
module.exports = router;

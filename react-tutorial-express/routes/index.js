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

// post comments
router.post('/api/comments', function (req, res, next) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});
module.exports = router;

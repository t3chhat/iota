var express = require('express');
var router = express.Router();

/* GET privacy page. */
router.get('/', function(req, res, next) {
  res.render('privacy', { title: 'Iota' });
});

module.exports = router;

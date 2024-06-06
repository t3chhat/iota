var express = require('express');
var router = express.Router();


// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT product_id, product_name, description, price, size, color, sold";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
  res.render('product/allrecords', {allrecs: result });
  });
});
  module.exports = router
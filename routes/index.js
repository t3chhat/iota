var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT id, product_name, prod_image, description, price, size, color, brand_id, category_id, sold FROM product WHERE homepage = 1";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }

    let query = "SELECT promo_title, promo_image, description FROM promotion WHERE start_date <= CURRENT_DATE() AND end_date >= CURRENT_DATE()";

    db.query(query, (err, result2) => {
      if (err) {
        console.log(err);
        res.render('error');
      }

    res.render('index', {allrecs: result, promos: result2 });
  });

  });
});
  
module.exports = router;
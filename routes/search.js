var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let query = "SELECT id, product_name, prod_image, description, price, size, color, brand_id, category_id, sold FROM product WHERE description LIKE '%" + req.query.searchcriteria + "%' OR product_name LIKE '%" + req.query.searchcriteria + "%'";
// execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('search', {allrecs: result});
        }
    });
});

module.exports = router;
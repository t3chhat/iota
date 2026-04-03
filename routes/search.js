var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let query = "SELECT id, product_name, prod_image, description, price, size, color, brand_id, category_id, sold FROM product WHERE description LIKE ? OR product_name LIKE ?";
    var searchterm = '%' + req.query.searchcriteria + '%';
// execute query
    db.query(query, [searchterm, searchterm], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('search', {allrecs: result});
        }
    });
});

module.exports = router;

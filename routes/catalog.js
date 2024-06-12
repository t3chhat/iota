var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, product_name, description, price, size, color, brand_id, category_id, sold, prod_image, homepage FROM product"
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        res.redirect('error');
    }           
        res.render('catalog', {allrecs: result });
    });
});
module.exports = router;


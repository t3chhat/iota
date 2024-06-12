var express = require('express');
var router = express.Router();

// Route to display report menu
// URL: http://localhost:3002/report/ 

router.get('/', function(req, res, next) {
    res.render('report/menu');
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/customer
// ==================================================
router.get('/customer', function(req, res, next) {
let query = "SELECT id, first_name, middle_name, last_name, email_address, phone_number, password, address_line1, address_line2, city, state, zip_code, country, payment_method, card_number, card_expiry, card_cvv FROM customer"; 

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/customerlist', {allrecs: result });
    });
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/product
// ==================================================

router.get('/product', function(req, res, next) {
    let query = "SELECT id, product_name, description, price, size, color, brand_id, category_id, sold, homepage FROM product"; 
    
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('report/productlist', {allrecs: result });
        });
    });


    // ==================================================
    // Route to list all records. Display view to list all records
    // URL: http://localhost:3002/report/sale
    // ==================================================


    router.get('/sale', function(req, res, next) {
        let query = "SELECT od.id id, c.first_name first_name, c.last_name last_name, od.order_date order_date, p.product_name product_name, oi.price price, oi.quantity quantity FROM customer c, order_detail od, order_items oi, product p WHERE oi.order_id = od.id AND oi.product_id = p.id AND od.user_id = c.id"; 
        
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                }
            res.render('report/salelist', {allrecs: result }); 
            });
        });
        

module.exports = router; 
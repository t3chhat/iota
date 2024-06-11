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
	res.render('customer/allrecords', {allrecs: result });
    });
});


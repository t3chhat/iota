var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
    res.render('customer/addrec');
    });


// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/product/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT id, first_name, middle_name, last_name, email_address, phone_number, username, address_line1, address_line2, city, state, zip_code, country, payment_method, isadmin FROM customer";

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
		res.render('customer/allrecords', {allrecs: result });
		}
    });
});


// ==================================================
// makeadmin
// ==================================================
router.get('/:recordid/makeadmin', function(req, res, next) {
    let query = "UPDATE customer SET isadmin = 1 WHERE id = ?";

    // execute query
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});


// ==================================================
// removeadmin
// ==================================================
router.get('/:recordid/removeadmin', function(req, res, next) {
    let query = "UPDATE customer SET isadmin = 0 WHERE id = ?";

    // execute query
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, first_name, middle_name, last_name, email_address, phone_number, username, address_line1, address_line2, city, state, zip_code, country, payment_method, isadmin FROM customer WHERE id = ?";

    // execute query
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('customer/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-customer.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('customer/addrec');
    });

// ==================================================
// Route Provide Login Window
// ==================================================
router.get('/login', function(req, res, next) {
    res.render('customer/login', {message: "Please Login"});
    });

    // ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
    let query = "SELECT id, first_name, last_name, password FROM customer WHERE username = ?";
    // execute query
    db.query(query, [req.body.username], (err, result) => {
        if (err) {res.render('error');}
        else {
            if(result[0])
                {
                // Username was correct. Check if password is correct
                bcrypt.compare(req.body.password, result[0].password, function
                (err, result1) {
                    if(result1) {
                        // Password is correct. Set session variables for user.
                        var customer_id = result[0].id;
                        req.session.customer_id = customer_id;
                        var custname = result[0].first_name + " "+ result[0].last_name;
                        req.session.custname = custname;
                        res.redirect('/');
                        } else {
                    // password do not match
                    res.render('customer/login', {message: "Wrong Password"});
                }
            });
        }
        else {res.render('customer/login', {message: "Wrong Username"});}
        }
    });
});


// ==================================================
// Route Check Login Credentials
// ==================================================
router.get('/logout', function(req, res, next) {
    req.session.customer_id = 0;
    req.session.custname = "";
    req.session.cart=[];
    req.session.qty=[];
    res.redirect('/');
});


// ==================================================
// Route to obtain customer input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO customer (first_name, middle_name, last_name, email_address, phone_number, username, password, address_line1, address_line2, city, state, zip_code, country, payment_method, card_number, card_expiry, card_cvv) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
                db.query(insertquery,[req.body.first_name, req.body.middle_name, req.body.last_name, req.body.email_address, req.body.phone_number, req.body.username, hash, req.body.address_line1, req.body.address_line2, req.body.city, req.body.state, req.body.zip_code, req.body.country, req.body.payment_method, req.body.card_number, req.body.card_expiry, req.body.card_cvv],(err, result) => {
                    if (err) {
                            console.log(err);
                            res.render('error');
                        } else {
                            res.redirect('/customer');
                    }
                });
            });
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, first_name, middle_name, last_name, email_address, phone_number, username, address_line1, address_line2, city, state, zip_code, country, payment_method, card_number, card_expiry, card_cvv FROM customer WHERE id = ?";

    // execute query
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('customer/editrec', {onerec: result[0] });
        }
    });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE customer SET first_name = ?, middle_name = ?, last_name = ?, email_address = ?, phone_number = ?, username = ?, password = ?, address_line1 = ?, address_line2 = ?, city = ?, state = ?, zip_code = ?, country = ?, payment_method = ?, card_number = ?, card_expiry = ?, card_cvv = ? WHERE id = ?";

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            db.query(updatequery,[req.body.first_name, req.body.middle_name, req.body.last_name, req.body.email_address, req.body.phone_number, req.body.username, hash, req.body.address_line1, req.body.address_line2, req.body.city, req.body.state, req.body.zip_code, req.body.country, req.body.payment_method, req.body.card_number, req.body.card_expiry, req.body.card_cvv, req.body.id],(err, result) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                } else {
                    res.redirect('/customer');
                }
            });
        });
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM customer WHERE id = ?";

    // execute query
    db.query(query, [req.params.recordid], (err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});



module.exports = router;

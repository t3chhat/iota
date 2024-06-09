var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/product/ 
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT id, order_id, product_id, price, quantity FROM order_items"; 

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('order_items/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, order_id, product_id, price, quantity FROM order_items WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('order_items/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('order_items/addrec');
    });
    

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO order_items (order_id, product_id, price, quantity) VALUES(?, ?, ?, ?)";

    db.query(insertquery,[req.body.order_id, req.body.product_id, req.body.price, req.body.quantity],(err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_items');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, order_id, product_id, price, quantity FROM order_items WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('order_items/editrec', {onerec: result[0] });
        }
    });
});
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE order_items SET order_id = ?, product_id = ?, price = ?, quantity = ? WHERE id = " + req.body.id;

    db.query(updatequery,[req.body.order_id, req.body.product_id, req.body.price, req.body.quantity],(err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_items');
        }
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM order_items WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_items');
        }
    });
});
    
    

module.exports = router;
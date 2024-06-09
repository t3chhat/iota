var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/product/ 
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT id, user_id, order_date, total_amount, order_status FROM order_detail"; 

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('order_detail/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, user_id, order_date, total_amount, order_status FROM order_detail WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('order_detail/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('order_detail/addrec');
    });
    

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO order_detail (user_id, order_date, total_amount, order_status) VALUES(?, ?, ?, ?)";

    db.query(insertquery,[req.body.user_id, req.body.order_date, req.body.total_amount, req.body.order_status],(err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, user_id, order_date, total_amount, order_status FROM order_detail WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('order_detail/editrec', {onerec: result[0] });
        }
    });
});
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE order_detail SET user_id = ?, order_date = ?, total_amount = ?, order_status = ? WHERE id = " + req.body.id;

    db.query(updatequery,[req.body.user_id, req.body.order_date, req.body.total_amount, req.body.order_status],(err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM order_detail WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order_detail');
        }
    });
});
    
    

module.exports = router;
var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/product/ 
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT id, brand_name FROM brand"; 

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('brand/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, brand_name FROM brand WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('brand/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('brand/addrec');
    });
    

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO brand (brand_name) VALUES(?)";

    db.query(insertquery,[req.body.brand_name],(err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/brand');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, brand_name FROM brand WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('brand/editrec', {onerec: result[0] });
        }
    });
});
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE brand SET brand_name = ? WHERE id = " + req.body.id;

    db.query(updatequery,[req.body.brand_name],(err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/brand');
        }
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM brand WHERE id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/brand');
        }
    });
});
    
    

module.exports = router;
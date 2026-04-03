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
        return res.render('error');
    } else {
        res.render('catalog', {allrecs: result });
    }
    });
});

// ==================================================
// Route to add an item to the cart
// ==================================================
    router.post('/add', function(req, res, next) {
        if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
            if (req.session.cart.includes(req.body.id))
            {
                // Item Exists in Basket - Increase Quantity
                var n = req.session.cart.indexOf(req.body.id);
                req.session.qty[n] = parseInt(req.session.qty[n]) +
                parseInt(req.body.qty);
            }
        else
            {
                // Item Being Added First Time
                req.session.cart.push(req.body.id);
                req.session.qty.push(req.body.qty);
            }
        }else {
                var cart = [];
                cart.push(req.body.id);
                req.session.cart = cart;
                var qty = [];
                qty.push(req.body.qty);
                req.session.qty = qty;
            }
    res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
    router.get('/cart', function(req, res, next) {
        if (!Array.isArray(req.session.cart) || !req.session.cart.length){
            res.render('cart', {cartitems: 0 });
        } else {
            var placeholders = req.session.cart.map(() => '?').join(',');
            let query = "SELECT id, product_name, description, price, size, color, brand_id, category_id, sold, prod_image, homepage FROM product WHERE id IN (" + placeholders + ") ORDER BY FIND_IN_SET(id, ?)";

        // execute query
        db.query(query, [...req.session.cart, req.session.cart.join(',')], (err, result) => {
            if (err) { return res.render('error');} else
                {res.render('cart', {cartitems: result, qtys: req.session.qty });}
                });
        }
    });


// ==================================================
// Route to remove an item from the cart
// ==================================================
    router.post('/remove', function(req, res, next) {
        // Find the element index of the auto_id that needs to be removed
    var n = req.session.cart.indexOf(req.body.id);
        // Remove element from cart and quantity arrays
    req.session.cart.splice(n,1);
    req.session.qty.splice(n,1);
    res.redirect('/catalog/cart');
});

// ==================================================
// Route to checkout - save cart items to order tables
// ==================================================
    router.get('/checkout', function(req, res, next) {
        // Check to make sure the customer has logged-in
        if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id ) {
            // Save ORDER_DETAIL Record:
            let insertquery = "INSERT INTO order_detail(user_id, order_date, total_amount, order_status) VALUES (?, now(), NULL, 'Pending')";
                db.query(insertquery,[req.session.customer_id],(err, result) => {
                    if (err) {
                        console.log(err);
                        return res.render('error');
                    } else {
            // Obtain the order_id value of the newly created order
                var order_id = result.insertId;
            // Save ORDER_ITEMS Records
                req.session.cart.forEach((cartitem, index) => {
                    let insertquery = "INSERT INTO order_items(order_id, product_id, price, quantity) VALUES (?, ?, (SELECT price FROM product WHERE id = ?), ?)";
                    db.query(insertquery,[order_id, cartitem, cartitem, req.session.qty[index]],(err, result) => {
                        if (err) { console.log(err); }
                    });
                });
                // Empty out the items from the cart and quantity arrays
                req.session.cart = [];
                req.session.qty = [];
                // Display confirmation page
                res.render('checkout', {ordernum: order_id });
                }
            });
        }
        else {
        // Prompt customer to login
        res.redirect('/customer/login');
        }
    });


module.exports = router;

/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

/* GET - ALL PRODUCTS */
router.get('/all', function(req, res, next) {
  Product.find({}, (err, products) => {
    if (err) { return next(err) }
    res.render('products/index', {
      products: products
    });
  });
});

/* GET -  PRODUCT CREATION FORM TO ADD PRODUCTS */
router.get('/', (req,res) => {
  res.render('products/add');
});

/* POST - CREATE A PRODUCT */
router.post('/', function(req, res, next) {
  // Take the params, and translate them into a new object
  const productInfo = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };
  // Create a new Product with the params
  const newProduct = new Product(productInfo);
  newProduct.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of products if it saves
    return res.redirect('/products/all');
  });
});


module.exports = router;

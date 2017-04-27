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

/* GET - SINGLE PRODUCT */
router.get('/product-details/:asdf', (req,res) =>{
  console.log("Detalle del producto ID:" + req.params.id);
  Product.findById(req.params.asdf, (err, product) => {
    res.render('products/detail', product);
  });
});

/* GET - EDIT PRODUCT */
router.get('/:id/edit', (req,res) =>{
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
      if (err) { return next(err); }
      res.render('products/edit', product);
  });
});

router.get('/:id/delete', (req, res)=>{
  const productId = req.params.id;
  Product.findByIdAndRemove(productId,(err, product) => {
    res.redirect('/products/all');
  })
});

/* POST - EDIT PRODUCT */
router.post('/:id', (req,res) =>{
  const productId = req.params.id;
  /*
    * Create a new object with all of the information from the request body.
    * This correlates directly with the schema of Product
    */
   const updates = {
       name: req.body.name,
       price: req.body.price,
       imageUrl: req.body.imageUrl,
       description: req.body.description
   };

   Product.findByIdAndUpdate(productId, updates, (err, product) => {
     if (err){ return next(err); }
     return res.redirect('/products/all');
   });
})

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

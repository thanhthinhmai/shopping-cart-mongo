var express = require('express');
var router = express.Router();

const Product = require('../models/product');
const Cart = require('../models/cart')
/* GET home page. */
router.get('/', function (req, res) {
  console.log(req.session);
  Product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', {
      title: 'Shopping Cart',
      products: docs
    });
  });

});

router.get('/add-to-cart/:id',function(req,res){
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/')
  })
  
})
router.get('/shopping-cart',function(req,res){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{
      products:null
    })
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
})

router.get('/checkout', function(req,res){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/checkout',{
    total: cart.totalPrice
  })
})
module.exports = router;

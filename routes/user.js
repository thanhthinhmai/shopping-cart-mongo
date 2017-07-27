var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function (req, res) {
  res.render('user/profile')
})

router.use('/',function(req,res,next){
    next();
})
router.get('/signup', function (req, res) {
  var messages = req.flash('error')
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
})

// router.post('/signup', function(req, res, next){
//   // res.render('user/signup',{csrfToken: req.csrfToken()})
//   console.log(req.body);
// })

// User.find(function (err, u) {
//   console.log(u);
// })

let a = User.findOne({email: 'mimi'})
a.then(data =>{
  console.log(data);
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

router.get('/signin', function (req, res) {
  let messages = req.flash('error');

  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  })
})
router.post('/signin', passport.authenticate('local.signin', {
 
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))
router.get('/logout', function(req,res){
    // req.session['email'] = false;
    // delete req.session['email'];
    req.logout();
    req.redirect('/')
})
module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}
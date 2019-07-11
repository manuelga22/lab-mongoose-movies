const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');
const session      = require("express-session");
const MongoStore   = require("connect-mongo")(session);

const passport = require('passport');

const ensureLogin = require("connect-ensure-login");

router.get('/logIn',(req,res)=>{
  res.render('userLogIn/logIn'
  // ,{message: req.flash("error")}
  );
});

router.get('/signUp',(req,res, next)=>{
  res.render('userLogIn/signUp');
});

router.get('/profile', isLoggedIn, (req,res,next)=>{
  
  res.render('userLogIn/profile');
});


router.post("/signUp/create", (req, res, next)=>{

  const thePassword = req.body.password;
  const theUsername = req.body.username;

  const salt = bcrypt.genSaltSync(12);
  const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

  User.create({
      username: theUsername,
      password: hashedPassWord
  })
  .then(()=>{
      console.log('yay');
      res.redirect('/logIn');
  })
  .catch((err)=>{
      next(err);
  })
});
router.post("/logIn", passport.authenticate("local", {

  successRedirect: "/profile",
  failureRedirect: "/logIn",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next)=>{
  req.logout()
  res.redirect('/')
})


function isLoggedIn(req, res, next) {
  req.hola = "hola"
  if(req.user) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports= router;



// router.post("/logIn/start",(req,res,next)=>{

//   const password = req.body.password;
//   const username = req.body.username;

//   User.findOne({"username":username})
//   .then(user => {
//     if (!user) {
//         res.send("username not found")
//         res.redirect('/logIn');
//     }
//     if (bcrypt.compareSync(password, user.password)) {

//      req.session.currentUser = user;
//      res.redirect('/profile');
  
//     } else {
//       res.send("wrong password not found");
//       res.redirect('/logIn');
//     }
// })
// .catch(error => {
//   next(error);
// })

// });

// router.get('/logIn/start', (req, res, next)=>{

//   if(req.session.User){

//       res.render('/profile', {user: req.session.currentUser})

//   } else {
//       res.send("wrong Sorry, you must be logged in to use that feature please log in not found");
//       res.redirect('/logIn')
//   }
// })






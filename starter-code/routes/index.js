const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity")
/* GET home page */
router.get('/',(req,res,next)=>{
   res.render('home');
});

router.get('/index', (req, res, next) => {
  Celebrity.find({})
 .then((celebrities)=>{
  res.render('index',{celebrities:celebrities});
 })
 .catch(()=>{
  console.log("error");
 })
});
router.get('/celebrities/new',(req,res)=>{
  res.render('celebrities/new');
});

router.post('/celebrities/create-celeb',(req,res)=>{
  const {name, occupation, catchPhrase} = req.body;
  let newCelebrity = {name:name, occupation:occupation, catchPhrase:catchPhrase};
  Celebrity.create(newCelebrity)
  .then(()=>{
    res.redirect('/');
  })
  .catch(()=>{
    console.log('error adding');
  });
});

router.get("/celebrities/edit/:id",(req,res,next)=>{
  const id = req.params.id;
  Celebrity.findById(id)
  .then(( celebrities)=>{
    console.log(celebrities)
    res.render('celebrities/edit',{celebrities:celebrities});
  })
  .catch((err)=>{
    console.log(err);
  })
});


router.post('/celebrities/update/:id',(req,res)=>{
  const id = req.params.id;
 Celebrity.findByIdAndUpdate(id, req.body)
 .then((Celebrity)=>{
   res.redirect('/');
 })
 .catch((err)=>{
   console.log(err);
 });
});

router.post('/celebrities/delete/:id', (req, res, next)=>{
  Celebrity.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/');
  })
  .catch((err)=>{
      next(err);
  })
});
router.get('/celebrities/:id', (req,res)=>{
  const id = req.params.id;
 Celebrity.findById(id)
 .then((celebrities)=>{
  res.render('celebrities/show',{celebrities:celebrities});
 })
 .catch(()=>{
  console.log("error");
 })
});





module.exports = router;

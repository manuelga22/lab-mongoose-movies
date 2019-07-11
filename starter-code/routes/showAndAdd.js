const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity")



router.get('/showAndAdd',(req,res,next)=>{
  res.render('addCelebrities/showAndAddScreen');
});

router.get('/showAndAdd/show',(req,res,next)=>{
  Celebrity.find()
  .then((celebrities)=>{
    res.json(celebrities);
  }).catch(()=> console.log('error'))
});

router.post('/showAndAddScreen/add',(req,res,next)=>{
  let name = req.body.name;
  let occupation = req.body.occupation;
  let catchPhrase = req.body.catchPhrase;

  Celebrity.create({
    name: name,
    occupation:occupation,
    catchPhrase: catchPhrase
  })
  .then(()=>{
    req.json({message: 'new indo added'})
  }).catch(()=>req.json({message:'failed to add info'}))

})


module.exports = router;

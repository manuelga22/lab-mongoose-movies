// import { Mongoose } from "mongoose";
const Mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
Mongoose.connect('mongodb://localhost/starter-code')


const celebrities = [
{
  name: "Goku",
  occupation: "Fight bad guys",
  catchPhrase: "Kamehameha"
},
{
  name:"Ash Ketchum",
  occupation:"Pokemon trainer",
  catchPhrase:"I wanna be the very best"
},
{
  name:"Mr.Satan",
  occupation:"Martial Arts Champion",
  catchPhrase:"Muahahahaha, I am Mr. Saatan"
}];

Celebrity.create(celebrities)
.then(()=>{
  console.log("created");
  Mongoose.disconnect();
})
.catch(()=>{
 console.log("error connecting to the data base");
});

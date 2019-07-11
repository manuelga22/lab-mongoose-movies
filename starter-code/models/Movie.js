const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
  title :{type:String},
  genre: {type:String},
  plot:{type:String}
});

module.exports = mongoose.model('Movie', Movie);
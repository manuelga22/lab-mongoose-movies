
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema =new Schema ({
  name:{type:String},
  occupation:{type:String},
  movies:{type: Schema.Types.ObjectId, ref: 'Movie'},
  catchPhrase :{type:String}

});

module.exports = mongoose.model('Celebrity', celebritySchema);

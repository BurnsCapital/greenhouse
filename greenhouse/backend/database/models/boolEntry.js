var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;

console.log(' o boolEntry loaded'); 

module.exports = new Schema(
  {
    "uniqueId" : String,
    "status" : Boolean,     
    "lku" : Date,
    "stateRoot" : String,
    "prevRoot" : String,      
  }, {collection: "boolEntry"}
); 
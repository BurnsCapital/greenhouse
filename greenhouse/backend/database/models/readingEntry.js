var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;

console.log(' o readingEntry loaded'); 

module.exports = new Schema(
  {
    "uniqueId" : String,
    "temp" : String,     
    "hum" : String,
    "lku" : Date,
    "stateRoot" : String,
    "prevRoot" : String,      
  }, {collection: "readingEntry"}
); 
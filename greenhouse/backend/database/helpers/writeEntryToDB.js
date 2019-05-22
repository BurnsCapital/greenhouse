var mongoose = require( 'mongoose' );

var boolEntry = mongoose.model( 'boolEntry' );

console.log(' o writeEntryToDb loaded'); 

module.exports = (data) =>{
    boolEntry.collection.insert(data, (err, res) => {
        if (typeof err !== 'undefined' && err) {
          if (err.code === 11000) {
           // if (!('quiet' in config && config.quiet === true)) {
             // console.log(`Skip: Duplicate DB key : ${err}`);
           // }
          } else {
            console.log(`Error: Aborted due to error on DB: ${err}`);
            process.exit(9);
          }
        } else {
          //if (!('quiet' in config && config.quiet === true)) {
            console.log(`* ${res.insertedCount} Boolentry successfully written.`);
          //}
        }
  });
    //console.log(data);
    return true;
};
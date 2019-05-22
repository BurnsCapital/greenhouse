var mongoose = require( 'mongoose' );

var readingEntry = mongoose.model( 'readingEntry' );

console.log(' o writeReadingToDb loaded'); 

module.exports = (data) =>{
    readingEntry.collection.insert(data, (err, res) => {
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
            console.log(`* ${res.insertedCount} readingEntry successfully written.`);
          //}
        }
  });
    //console.log(data);
    return true;
};
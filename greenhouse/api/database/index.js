
var mongoose = require( 'mongoose' );

var { boolEntry, readingEntry } = require('./models');

console.log('\n Loading DB helpers');

mongoose.connect(process.env.MONGO_URI || 'mongodb://172.16.0.91/greenhousetesting');

module.exports = {
    boolEntry : boolEntry,
    readingEntry : readingEntry,
}

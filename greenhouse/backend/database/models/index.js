var mongoose = require( 'mongoose' );

console.log('\n Loading DB Models');

var boolEntry = require('./boolEntry');
var readingEntry = require('./readingEntry');
mongoose.model('boolEntry', boolEntry);
mongoose.model('readingEntry', readingEntry);
module.exports = {
    boolEntry : mongoose.model('boolEntry'),
    readingEntry : mongoose.model('readingEntry'),
}
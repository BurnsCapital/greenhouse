
var mongoose = require( 'mongoose' );

var { boolEntry } = require('./models');

console.log('\n Loading DB helpers');
var WriteEntryToDB = require ('./helpers/writeEntryToDB');
var WriteReadingToDB = require ('./helpers/writeReadingToDB');

mongoose.connect(process.env.MONGO_URI || 'mongodb://172.16.0.91/greenhousetesting');

module.exports = {
    WriteEntryToDB : WriteEntryToDB,
    WriteReadingToDB : WriteReadingToDB,
    boolEntry : boolEntry,
}

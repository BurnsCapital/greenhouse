// DB
const { boolEntry } = require( '../database/index.js' );

module.exports = (req, res) => {
    boolEntry.find((err, docs)=> {
        if(!err && docs) {
            res.write(JSON.stringify({"boolEntries": docs }))
            res.end();
        } else {
            console.log("boolFind error:" + err);
            res.write(JSON.stringify({"error": true}));
            res.end();
          }
        });
    return res;
}
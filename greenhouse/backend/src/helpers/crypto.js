const crypto = require('crypto');

console.log('  o cryptoHelper loaded');

function sha256(data) {
    return crypto.createHash("sha256").update(data, "binary").digest("hex");
  }
  
module.exports =  (_cacheState) => {
      /* merkleTree
      *  h(id)   h(status)   h(lku)  h(prevRoot)      
      *     \     /             \      / 
      *      h(ab)                h(cd)
      *           \             /
      *              h(abcd)
      *  *make this more efficent
      */
     cacheState = {..._cacheState};
     let mRoot = [
        sha256(cacheState.uniqueId),
        sha256(cacheState.status.toString()),
        sha256(cacheState.lku.toString()),
        sha256(cacheState.prevRoot.toString()),
        "0x00","0x00","0x00"];

      mRoot[4] = sha256(mRoot[0] + mRoot[1]);
      mRoot[5] = sha256(mRoot[2] + mRoot[3]);
      
      return sha256(mRoot[4] + mRoot[5]);
    };

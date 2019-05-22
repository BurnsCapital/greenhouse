const { WriteReadingToDB }  = require('../../database');

var dht = require("pigpio-dht");

class DhtMon {
    constructor(_Id, _gpio, _type, _interval){
      this.state = {
        stateRoot: "0x00",
        prevRoot: "0x00",
        uniqueId: _Id,
        temp : 0,
        hum : 0,
        lku : Date.now(),
        gpio : _gpio,
        type : _type,
        interval: _interval,
      };
      this.sensor = dht(_gpio,_type);
      console.log('  o %s online', _Id);
   }
    play(){
       setInterval( () => {
        this.sensor.read();
        this.sensor.on('result', data => {
            setState(this.uniqueId, result);
            WriteEntryToDB(this.state);
        });
      }, this.state.interval); 
    }

    setState(_Id, _value){
      const { mtree } = require('../index');
      let cacheState={};
      cacheState.uniqueId = _Id;
      cacheState.temp = _value.temperture;
      cacheState.hum = _value.humidity;
      cacheState.lku = Date.now();
      cacheState.prevRoot = this.state.stateRoot;
      //create the stateRoot
      cacheState.stateRoot = mtree(cacheState);
      //console.log(cacheState);
      this.state = {...cacheState};
      return true;
    }

    
};



module.exports = DhtMon;
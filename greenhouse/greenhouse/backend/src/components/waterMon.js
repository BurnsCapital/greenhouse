const Gpio = require('pigpio').Gpio;
const { WriteEntryToDB }  = require('../../database');

class WaterMon {
    constructor(_Id, _gpio, _interval){
      this.state = {
        stateRoot: "0x00",
        prevRoot: "0x00",
        uniqueId: _Id,
        status : 1,
        lku : Date.now(),
        gpio : _gpio,
        interval: _interval,
      };
      console.log('  o %s online', _Id);
   }
    play(){
      let pin = new Gpio(this.state.gpio, {mode: Gpio.INPUT});
      setInterval( () => {
        this.setState( this.state.uniqueId, pin.digitalRead());   
        WriteEntryToDB(this.state);
      }, this.state.interval); 
    }

    setState(_Id, _value){
      const { mtree } = require('../index');
      let cacheState={};
      cacheState.uniqueId = _Id;
      cacheState.status = _value;
      cacheState.lku = Date.now();
      cacheState.prevRoot = this.state.stateRoot;
      //create the stateRoot
      cacheState.stateRoot = mtree(cacheState);
      //console.log(cacheState);
      this.state = {...cacheState};
      return true;
    }

    
};




module.exports = WaterMon;

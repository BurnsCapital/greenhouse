var dht = require("pigpio-dht");

var sensor = dht(17,11)


setInterval(()=>{
  console.log('sending read');
  sensor.read();
}, 1000);
sensor.on('result', data => {
    console.log(data);
  
});
sensor.on('badChecksum', () => {
    console.log('checksum failed');
});

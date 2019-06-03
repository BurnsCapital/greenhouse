const { ascii, WaterMon, DhtMon } = require('./src');

const globalInterval = process.env.INTERVAL || 300000; // 5 minutes

//load inputs
console.log("\n Starting liquid monitors");
const wm1 = new WaterMon("bottomGauge", 2 , globalInterval);
const wm2 = new WaterMon("middleGauge", 3 , globalInterval);
const wm3 = new WaterMon("surfaceGauge", 4 , globalInterval);

const dht1 = new DhtMon("DHT-11", 17, 11, globalInterval);

//activate the sensors
console.log('\n Activating monitors');
wm1.play();
wm2.play();
wm3.play();




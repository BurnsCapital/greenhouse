require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const API_PORT = process.env.API_PORT;
const app = express();
app.use(cors());
const router = express.Router();
const { getWater } = require('./routes');
const { logger } = require('./lib'); 

logger.log('info','Loading API main');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is our get method
// this method fetches all available data in our database
router.get("/getWater", getWater);

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(process.env.API_PORT, () => console.log(` LISTENING ON PORT ${process.env.API_PORT}`));

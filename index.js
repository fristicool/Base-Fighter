const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const { mongoose } = require('./db.js');
var baseController = require('./controllers/baseController.js');
var troopController = require('./controllers/troopController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3002, () => console.log('Server stbed at port : 3000'));


app.use('/', baseController);
app.use('/troop', troopController);

module.exports.handler = serverless(app)
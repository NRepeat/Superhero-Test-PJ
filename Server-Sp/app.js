const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = express.json();
const router = require('./routers');
app.use(cors())
app.use(bodyParser);
app.use(express.static('public'))
app.use(router);

module.exports = app;
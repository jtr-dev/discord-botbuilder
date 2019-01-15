'use strict';
global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('ws');
const express = require('express');
const app = express();
const https = require('https');
const server = require('http').createServer(app);
const router = require('./router.js');
require('dotenv').config();

app.use('/', router);
server.listen(process.env.PORT || 3978);

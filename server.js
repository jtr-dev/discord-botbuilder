'use strict';
var express = require('express');
var app = express();
var https = require('https');
var server = require('http').createServer(app);
var router = require('./router.js');

app.use('/', router);
server.listen(process.env.PORT || 3978);
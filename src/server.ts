'use strict';
global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('ws');
// import * as express from 'express';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router.js');
require('dotenv').config();
require("./router")(app);

server.listen(process.env.PORT || 3978);

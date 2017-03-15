var express = require('express');
var router = express.Router();
var botcore = require('./src/botcore.js');

router.post('/api/messages', botcore.connector.listen());


module.exports = router;
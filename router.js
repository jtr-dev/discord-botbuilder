var express = require('express');
var router = express.Router();
var botcore = require('./src/botcore.js');

router.post('/api/messages', botcore.connector.listen());


router.use('/scripts', express.static(__dirname + '/scripts'));
router.use('/resources', express.static(__dirname + '/resources'));
router.use('/partials', express.static(__dirname + '/views/partials'));

router.get('/', function (req, res) {
  res.sendfile('views/log.html', { root: __dirname });
});
router.get('/log', function (req, res) {
  res.json(WikiaChatConnector.logger.log);
});
router.get('/furniture', function (req, res) {
  res.sendfile('views/Grabber.html', { root: __dirname });
});
router.get('/poi', function (req, res) {
  res.sendfile('views/Poidb2NodeInfo.html', { root: __dirname });
});



module.exports = router;
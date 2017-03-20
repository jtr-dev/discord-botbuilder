var https = require('https');
var Channel = require('./channel-map.js');
// var DirectLine = require('botframework-directlinejs').DirectLine;
// var Rx = require('@reactivex/rxjs');

// var directLine = new DirectLine({
//     secret: process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD,
//     // token: ''/* or put your Direct Line token here (supply secret OR token, not both) */,
//     // domain: '' /* optional: if you are not using the default Direct Line endpoint, e.g. if you are using a region-specific endpoint, put its full URL here */
//     // webSocket: '' /* optional: false if you want to use polling GET to receive messages. Defaults to true (use WebSocket). */,
//     // pollingInterval:  /* optional: set polling interval in milliseconds. Default to 1000 */,
// });

// var DirectLineConnector = {
//   watermark: '0',
//   conversation: function (channel) {
//     var options = {
//       host: 'directline.botframework.com',
//       path: '/api/conversations',
//       method: 'POST',
//       headers:
//       {
//         'Authorization': 'BotConnector ' + (process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD),
//       }
//     };
//     var post = https.request(options, function (res) {
//       var body = '';
//       res.on('data', function (chunk) { body += chunk; });
//       res.on('end', function () {
//         Channel.add(this.channel,JSON.parse(body).conversationId);
//       }.bind({ channel: this.channel }));
//     }.bind({ channel: channel }));
//     post.end();
//   },
//   send: function (conversationId, user, text) {
//     Rx.Observable.of(directLine.postActivity({
//     from: { id: conversationId, name: user }, // required (from.name is optional)
//     type: 'message',
//     text: text
//     })).subscribe(
//     (id) => console.log("Posted activity, assigned ID ", id),
//     (error) => console.log("Error posting activity", error)
//     );

//     Rx.Observable.of(directLine.activity$)
//       .filter(activity => activity.type === 'message')
//       .subscribe(
//         (activity) => console.log("received activity ", activity)
//       );
//   }
// }



var DirectLineConnector = {
  watermark: '0',
  conversation: function (channel) {
    var options = {
      host: 'directline.botframework.com',
      path: '/api/conversations',
      method: 'POST',
      headers:
      {
        'Authorization': 'BotConnector ' + (process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD),
      }
    };
    var post = https.request(options, function (res) {
      var body = '';
      res.on('data', function (chunk) { body += chunk; });
      res.on('end', function () {
        Channel.add(this.channel,JSON.parse(body).conversationId);
      }.bind({ channel: this.channel }));
    }.bind({ channel: channel }));
    post.end();
  },
  send: function (conversationId, user, text) {
    var payload = JSON.stringify({
      "conversationId": conversationId,
      "from": user,
      "text": text
    });
    var options = {
      host: 'directline.botframework.com',
      path: '/api/conversations/' + conversationId + '/messages',
      method: 'POST',
      headers:
      {
        'Authorization': 'BotConnector ' + (process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD),
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    var post = https.request(options, function () {
     
    })
    post.write(payload);
    post.end();
  },
  get: function (conversation) {
    https.get({
      hostname: 'directline.botframework.com',
      path: '/api/conversations/' + conversation + '/messages',
      headers: {
        'authorization': 'BotConnector ' + (process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD),
        'watermark': this.watermark,
        agent: false
      }
    }, (res) => {
      var body = '';
      res.on('data', function (chunk) { body += chunk; });
      res.on('end', function () { });
    });
  }
};

module.exports = DirectLineConnector;
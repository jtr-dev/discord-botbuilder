// var WikiaChatConnector = require('./wikia-chat-connector.js');
var ChannelMap = require('./channel-map.js');
var DiscordConnector = require('./discord-connector.js');

var Demultiplexer = {};

Demultiplexer.send = function (session, msg, onDefault) {
    console.log(session, msg)
    if (onDefault) {
        session.send(msg)
        return;
    }
    var conversationId = JSON.stringify(session.message.address.conversation.id);
    var channel = ChannelMap.get(conversationId);
    console.log(conversationId)
    try {
        DiscordConnector.send(msg);
    }
    catch (e) {
        session.send(msg);
    }
};

module.exports = Demultiplexer;
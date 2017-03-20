// var WikiaChatConnector = require('./wikia-chat-connector.js');
var ChannelMap = require('./channel-map.js');
var DiscordConnector = require('./discord-connector.js');

var Demultiplexer = {};

Demultiplexer.send = function (session, msg) {
    var conversationId = JSON.stringify(session.message.address.conversation.id);
    var channel = ChannelMap.get(conversationId);
    console.log(conversationId)
    try {
        DiscordConnector.send(channel.id, msg);
    }
    catch (e) {
        session.send(msg);
    }
};

module.exports = Demultiplexer;
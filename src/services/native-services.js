var DirectLineConnector = require('./direct-line-connector.js');
var ChannelMap = require('./channel-map.js');
var Native = {};

Native.OnDefault = function (chat) {
    if (!((RegExp('^tyler-bot')).test(chat.name))) {
        var str = chat.text.replace(RegExp('^' + process.env.DISCORD_BOT_NAME + ''), "");
        str = str.replace((RegExp('^(@' + (process.env.DISCORD_BOT_NAME) + '|<@' + process.env.DISCORD_BOT_ID + '>)[ ,:]', 'i')), "");
        str = str.replace(/^ +/, "");
        str = str.replace(/[, ]+$/, "");
        if (str == 'ping')
            return 'pong';
    }
    return null;

};

module.exports = Native;
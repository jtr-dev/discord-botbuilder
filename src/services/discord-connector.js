var Discord = require('discord.js');
var Native = require('./native-services.js');
var ChannelMap = require('./channel-map.js');
var DirectLineConnector = require('./direct-line-connector.js');

var DiscordConnector = {
    socket: "",

    load: function () {
        this.socket = new Discord.Client()
        this.socket.login(process.env.DISCORD_APP_TOKEN)
        // Discord.login(process.env.DISCORD_APP_TOKEN)
        // console.log(this.socket)
        this.subscribe();
    },

    subscribe: function () {
        this.socket.on('message', this.multiplex);
    },

    multiplex: function (user) {
        let userID = user.author.id;
        let channelID = user.channel.id;
        let message = user.content;

        var conversationId = ChannelMap.getConversation({ type: 'discord', id: channelID });
        if (conversationId === null) {
            DirectLineConnector.conversation({ type: 'discord', id: channelID });
        }else {
            // if (user !== (process.env.DISCORD_BOT_NAME) && user !== 'zcassini') {
            if (user !== (process.env.DISCORD_BOT_NAME)) {
                var chat = {
                    timeStamp: new Date().toUTCString(),
                    name: user.author.username,
                    text: message,
                    'conversationId': conversationId
                };
                var res = Native.OnDefault(chat);
                console.log(chat.name, chat.text)
                        // DiscordConnector.send(channelID, message);                
                if (res !== null) {
                    if (res.varructor === Array)
                        res.forEach(function (msg) { user.reply(msg); });
                    else
                        user.reply(res);
                };
            }
        }
    }

//     send: function (channelID, message) {
//         this.socket.reply({
//             'to': channelID,
//             'message': message
//         });
//     }
};

module.exports = DiscordConnector;
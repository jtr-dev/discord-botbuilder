"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botframework_directlinejs_1 = require("botframework-directlinejs");
class DirectLineConnector {
    constructor(user, name, guild, channel) {
        this.channels = [];
        this.user = user;
        this.name = name;
        this.guild = guild;
        this.channel = channel;
        this.directLine = new botframework_directlinejs_1.DirectLine({
            secret: process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD,
        });
    }
    send(msg) {
        return this.directLine.postActivity({
            from: {
                id: `${this.name}-${this.guild}-${this.channel}`,
                name: `${this.name}-${this.guild}-${this.channel}`
            },
            type: 'message',
            text: msg
        }).subscribe(id => {
            this.channels = [...this.channels, id];
        });
    }
    receiver() {
        this.directLine.activity$
            .filter(activity => activity.type === 'message' &&
            activity.from.id === process.env.MICROSOFT_BOT_NAME).subscribe(message => {
            this.user.reply(message.text);
        });
    }
    status() {
        this.directLine.connectionStatus$
            .subscribe((connectionStatus) => {
            switch (connectionStatus) {
                case botframework_directlinejs_1.ConnectionStatus.Uninitialized: // the status when the DirectLine object is first created/constructed
                case botframework_directlinejs_1.ConnectionStatus.Connecting: // currently trying to connect to the conversation
                case botframework_directlinejs_1.ConnectionStatus.Online: // successfully connected to the converstaion. Connection is healthy so far as we know.
                    console.log(botframework_directlinejs_1.ConnectionStatus[connectionStatus]);
                    break;
                case botframework_directlinejs_1.ConnectionStatus.ExpiredToken: // last operation errored out with an expired token. Your app should supply a new one.
                case botframework_directlinejs_1.ConnectionStatus.FailedToConnect: // the initial attempt to connect to the conversation failed. No recovery possible.
                    console.log(botframework_directlinejs_1.ConnectionStatus[connectionStatus]);
                    break;
                case botframework_directlinejs_1.ConnectionStatus.Ended: // the bot ended the conversation
                    console.log(botframework_directlinejs_1.ConnectionStatus[connectionStatus]);
                    break;
            }
        });
    }
}
exports.DirectLineConnector = DirectLineConnector;
//# sourceMappingURL=direct-line-connector.js.map
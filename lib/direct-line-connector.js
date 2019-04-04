"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botframework_directlinejs_1 = require("botframework-directlinejs");
class DirectLineConnector {
    constructor(message, { name, guild, channel }) {
        this.message = message;
        this.name = name;
        this.guild = guild;
        this.channel = channel;
        this.directLine = new botframework_directlinejs_1.DirectLine({
            secret: process.env.BOT_FRAMEWORK_DIRECT_API_PASSWORD,
        });
    }
    send(msg) {
        this.directLine.postActivity({
            from: {
                id: `${this.name}-${this.guild}-${this.channel}`,
                name: `${this.name}-${this.guild}-${this.channel}`
            },
            type: 'message',
            text: msg
        }).subscribe();
    }
    receiver() {
        this.directLine.activity$
            .filter(activity => activity.type === 'message' &&
            activity.from.id === process.env.MICROSOFT_BOT_NAME).subscribe(response => {
            this.message.reply(response['text']);
        });
    }
    status() {
        this.directLine.connectionStatus$
            .subscribe((connectionStatus) => {
            // switch (connectionStatus) {
            //   case ConnectionStatus.Uninitialized:    // the status when the DirectLine object is first created/constructed
            //   case ConnectionStatus.Connecting:       // currently trying to connect to the conversation
            //   case ConnectionStatus.Online:           // successfully connected to the converstaion. Connection is healthy so far as we know.
            //   case ConnectionStatus.ExpiredToken:     // last operation errored out with an expired token. Your app should supply a new one.
            //   case ConnectionStatus.FailedToConnect:  // the initial attempt to connect to the conversation failed. No recovery possible.
            //   case ConnectionStatus.Ended:            // the bot ended the conversation
            // }
            console.log(botframework_directlinejs_1.ConnectionStatus[connectionStatus]);
        });
    }
}
exports.DirectLineConnector = DirectLineConnector;
//# sourceMappingURL=direct-line-connector.js.map
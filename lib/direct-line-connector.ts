import * as Discord from 'discord.js';
import { DirectLine, ConnectionStatus } from 'botframework-directlinejs';

export class DirectLineConnector {
  directLine: DirectLine;
  message: Discord.Message;
  name: string;
  text!: string;
  guild: string;
  channel: string;

  constructor(message: Discord.Message, { name, guild, channel }) {
    this.message = message;
    this.name = name;
    this.guild = guild;
    this.channel = channel;
    this.directLine = new DirectLine({
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
    }).subscribe()
  }

  receiver() {
    this.directLine.activity$
      .filter(
        activity => activity.type === 'message' &&
          activity.from.id === process.env.MICROSOFT_BOT_NAME
      ).subscribe(
        response => {
          this.message.reply(response['text'])
        }
      );
  }

  status() {
    this.directLine.connectionStatus$
      .subscribe((connectionStatus: any) => {
        // switch (connectionStatus) {
        //   case ConnectionStatus.Uninitialized:    // the status when the DirectLine object is first created/constructed
        //   case ConnectionStatus.Connecting:       // currently trying to connect to the conversation
        //   case ConnectionStatus.Online:           // successfully connected to the converstaion. Connection is healthy so far as we know.
        //   case ConnectionStatus.ExpiredToken:     // last operation errored out with an expired token. Your app should supply a new one.
        //   case ConnectionStatus.FailedToConnect:  // the initial attempt to connect to the conversation failed. No recovery possible.
        //   case ConnectionStatus.Ended:            // the bot ended the conversation
        // }
        console.log(ConnectionStatus[connectionStatus])
      });
  }

}
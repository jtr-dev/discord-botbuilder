import { DirectLine, ConnectionStatus } from 'botframework-directlinejs';

export class DirectLineConnector {
  directLine: any;
  user: any;
  name: any;
  text: any;
  guild: any;
  channel: any;
  channels: any = [];

  constructor(user, name, guild, channel) {
    this.user = user;
    this.name = name;
    this.guild = guild;
    this.channel = channel;
    this.directLine = new DirectLine({
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
      this.channels = [...this.channels, id]
    });
  }

  receiver() {
    this.directLine.activity$
      .filter(
        activity => activity.type === 'message' &&
          activity.from.id === process.env.MICROSOFT_BOT_NAME
      ).subscribe(
        message => {
          this.user.reply(message.text)
        }
      );
  }

  status() {
    this.directLine.connectionStatus$
      .subscribe((connectionStatus: any) => {
        switch (connectionStatus) {
          case ConnectionStatus.Uninitialized:    // the status when the DirectLine object is first created/constructed
          case ConnectionStatus.Connecting:       // currently trying to connect to the conversation
          case ConnectionStatus.Online:           // successfully connected to the converstaion. Connection is healthy so far as we know.
            console.log(ConnectionStatus[connectionStatus])
            break;
          case ConnectionStatus.ExpiredToken:     // last operation errored out with an expired token. Your app should supply a new one.
          case ConnectionStatus.FailedToConnect:  // the initial attempt to connect to the conversation failed. No recovery possible.
            console.log(ConnectionStatus[connectionStatus])
            break;
          case ConnectionStatus.Ended:            // the bot ended the conversation
            console.log(ConnectionStatus[connectionStatus])
            break;
        }
      });
  }

}
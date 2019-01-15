export class DirectLineConnector {
    constructor(user: any, name: any, guild: any, channel: any);
    channels: any;
    user: any;
    name: any;
    guild: any;
    channel: any;
    directLine: any;
    receiver(): void;
    send(msg: any): any;
    status(): void;
}
export class DiscordConnector {
    constructor({ token }: any);
    token: any;
    channels: any;
    load(): void;
    multiplex(user: any): void;
    subscribe(): void;
}

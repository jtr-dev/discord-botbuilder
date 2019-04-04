import * as Discord from 'discord.js';

export class DirectLineConnector {
    constructor(user: Discord.User, name: any, guild: any, channel: any);
    name: string;
    guild: string;
    channel: string;
    channels: string[];
    receiver(): void;
    send(msg: string): void;
    status(): void;
}

export class DiscordConnector {
    constructor({ token }: { token: string | undefined });
    token: string;
    channels: DirectLineConnector[];
    load(): void;
    multiplex(user: any): void;
    subscribe(): void;
}

import * as Discord from 'discord.js';
import { DirectLineConnector } from './direct-line-connector'

export class DiscordConnector {
    token: string | undefined;
    client!: Discord.Client;
    session?: DirectLineConnector;
    channels: DirectLineConnector[];
    constructor({ token }: { token: string | undefined }) {
        this.token = token;
        this.client;
        this.session;
        this.channels = [];
        this.load();
    }

    load() {
        if (this.token === undefined) {
            throw new Error('Token is ' + this.token)
        }
        this.client = new Discord.Client()
        this.client.login(this.token)
            .then(() => this.subscribe())
            .catch((err) => console.log(err))
    }

    subscribe() {
        console.log("Discord Connected");
        this.client.on('message', this.multiplex.bind(this));
    }

    multiplex(message) {
        console.log(message)
        const { TAG, TAG_HASH, DISCORD_BOT_NAME } = process.env

        if (!TAG || !TAG_HASH || !DISCORD_BOT_NAME) {
            throw new Error(`
                Verify environment variables are setup correctly =>  
                TAG: ${TAG} TAG_HASH: ${TAG_HASH} DISCORD_BOT_NAME: ${DISCORD_BOT_NAME}
            `);
        }

        const name = message.author.username;
        const content = message.content;
        const guild = message.guild.id;
        const channel = message.channel.name;

        if (name !== DISCORD_BOT_NAME && (content.includes(TAG_HASH) || content.includes(TAG))) {
            let tag: string, msg: string;

            if (content.startsWith("<@")) {
                const split = content.split(TAG_HASH)
                tag = TAG
                msg = split[1]
            } else {
                tag = content.slice(0, TAG.length)
                msg = content.slice(TAG.length)
            }
            if (tag === TAG && msg) {
                const relevant = this.channels.find(c => c.name === name && c.channel === channel && c.guild === guild)
                this.tenor(message, { msg, name, guild, channel }, relevant)
            }
        }
    }

    tenor(
        message: Discord.Message,
        user: { msg: string, name: string, guild: string, channel: string },
        relevant: DirectLineConnector | undefined
    ): void {
        if (relevant) {
            this.session = relevant
        } else {
            this.session = new DirectLineConnector(message, user)
            this.session.receiver();
            this.channels = [...this.channels, this.session]
        }
        this.session.send(user.msg)
    }
};

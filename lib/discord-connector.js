"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require('discord.js');
const direct_line_connector_1 = require("./direct-line-connector");
class DiscordConnector {
    constructor({ token }) {
        this.token = token;
        this.client;
        this.session;
        this.event;
        this.channels = [];
        this.load();
    }
    load() {
        this.client = new Discord.Client();
        this.client.login(this.token);
        this.subscribe();
    }
    subscribe() {
        this.client.on('message', this.multiplex.bind(this));
    }
    multiplex(user) {
        const guild = user.guild.id;
        const channel = user.channel.name;
        const name = user.author.username;
        const message = user.content;
        if (name !== process.env.DISCORD_BOT_NAME) {
            let tag, msg;
            if (message.includes(process.env.TAG_HASH)) {
                const split = message.split(process.env.TAG_HASH);
                tag = 'tag';
                msg = split[1];
            }
            else {
                tag = message.slice(0, 3);
                msg = message.slice(4);
            }
            if (tag === process.env.TAG || 'tag') {
                if (!this.session) {
                    this.session = new direct_line_connector_1.DirectLineConnector(user, name, guild, channel);
                }
                if (this.session && this.session.channels) {
                    const relevant = this.channels.find(c => c.name === name && c.channel === channel && c.guild === guild);
                    console.log(relevant);
                    if (!relevant) {
                        this.session = new direct_line_connector_1.DirectLineConnector(user, name, guild, channel);
                        this.session.receiver();
                    }
                    else {
                        this.session = relevant;
                    }
                }
                this.session.send(msg);
                this.channels = [...this.channels, this.session];
            }
        }
    }
}
exports.DiscordConnector = DiscordConnector;
;
//# sourceMappingURL=discord-connector.js.map
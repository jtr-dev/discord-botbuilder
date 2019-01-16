"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const direct_line_connector_1 = require("./direct-line-connector");
class DiscordConnector {
    constructor({ token }) {
        this.token = token;
        this.client;
        this.session;
        this.channels = [];
        this.load();
    }
    load() {
        if (this.token === undefined) {
            throw new Error('Token is ' + this.token);
        }
        this.client = new Discord.Client();
        this.client.login(this.token)
            .then(() => this.subscribe())
            .catch((err) => console.log(err));
    }
    subscribe() {
        console.log("Discord Connected");
        this.client.on('message', this.multiplex.bind(this));
    }
    multiplex(user) {
        const guild = user.guild.id;
        const channel = user.channel.name;
        const name = user.author.username;
        const message = user.content;
        if (name !== process.env.DISCORD_BOT_NAME && (message.includes(process.env.TAG_HASH) || message.includes(process.env.TAG))) {
            let tag, msg;
            if (message.startsWith("<@")) {
                const split = message.split(process.env.TAG_HASH);
                tag = 'tag';
                msg = split[1];
            }
            else {
                tag = message.slice(0, 3);
                msg = message.slice(4);
            }
            if (tag === process.env.TAG || tag === 'tag') {
                if (!this.session) {
                    this.session = new direct_line_connector_1.DirectLineConnector(user, name, guild, channel);
                }
                if (this.session && this.session.channels) {
                    const relevant = this.channels.find(c => c.name === name && c.channel === channel && c.guild === guild);
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
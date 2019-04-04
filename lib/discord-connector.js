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
    multiplex(message) {
        console.log(message);
        const { TAG, TAG_HASH, DISCORD_BOT_NAME } = process.env;
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
            let tag, msg;
            if (content.startsWith("<@")) {
                const split = content.split(TAG_HASH);
                tag = TAG;
                msg = split[1];
            }
            else {
                tag = content.slice(0, TAG.length);
                msg = content.slice(TAG.length);
            }
            if (tag === TAG && msg) {
                const relevant = this.channels.find(c => c.name === name && c.channel === channel && c.guild === guild);
                this.tenor(message, { msg, name, guild, channel }, relevant);
            }
        }
    }
    tenor(message, user, relevant) {
        if (relevant) {
            this.session = relevant;
        }
        else {
            this.session = new direct_line_connector_1.DirectLineConnector(message, user);
            this.session.receiver();
            this.channels = [...this.channels, this.session];
        }
        this.session.send(user.msg);
    }
}
exports.DiscordConnector = DiscordConnector;
;
//# sourceMappingURL=discord-connector.js.map
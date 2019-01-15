"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require('botbuilder');
const scenario = require('./dialogs');
const dialogs_1 = require("./dialogs");
// todo: move this, without breaking process.env
require('dotenv').config();
const discord_connector_1 = require("./services/discord-connector");
var core = {};
exports.core = core;
core.model = process.env.LUIS_MODEL_API;
core.recognizer = new builder.LuisRecognizer(core.model);
core.dialog = new builder.IntentDialog({ recognizers: [core.recognizer] });
core.connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
core.bot = new builder.UniversalBot(core.connector);
// core.bot.set('localizerSettings', { defaultLocale: "en" })
// core.bot.name = process.env.DISCORD_BOT_NAME;
// Anytime the major version is incremented any existing conversations will be restarted.
core.bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
new discord_connector_1.DiscordConnector({
    token: process.env.DISCORD_APP_TOKEN
});
core.bot.dialog('/', core.dialog)
    .matches('Goodbye', dialogs_1.goodbye)
    .matches('Thanking', dialogs_1.gracias)
    .matches('Greeting', dialogs_1.greetings)
    .matches('Help', dialogs_1.help)
    .matches('Rude', dialogs_1.rude)
    .matches('None', dialogs_1.none)
    .matches('Personal', dialogs_1.personal)
    .matches('Teaching', dialogs_1.teaching)
    .onDefault(session => {
    session.send(`Sorry, ${session.message.text} is not recognized or supported currently`);
});
//# sourceMappingURL=botcore.js.map
const builder = require('botbuilder');
const scenario = require('./dialogs');
// const Discord = require('discord.js');
// const bot = new Discord.Client();
// const cfg = require("./../config.json");
require('dotenv').config();
var DiscordConnector = require('./services/discord-connector.js');

var core = {};

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
new DiscordConnector({
    token: process.env.DISCORD_APP_TOKEN
});

core.bot.dialog('/', core.dialog)
    .matches('Goodbye', [scenario.goodbye])
    .matches('Thanking', [scenario.gracias])
    .matches('Greeting', [scenario.greet])
    .matches('Help', scenario.help)
    .matches('Rude', [scenario.rude])
    .matches('None', [scenario.none])
    .matches('Personal', [scenario.personal])
    .matches('Teaching', [scenario.teaching])
    .onDefault((session) => {
        session.send(`Sorry, ${session.message.text} is not recognized or supported currently`)
    });



module.exports = core;

const builder = require('botbuilder');
const scenario = require('./dialogs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require("./../config.json");

var core = {};

core.model = (process.env.LUIS_MODEL_API);
core.recognizer = new builder.LuisRecognizer(core.model);
core.dialog = new builder.IntentDialog({ recognizers: [core.recognizer] });
core.connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
core.bot = new builder.UniversalBot(core.connector);

// Anytime the major version is incremented any existing conversations will be restarted.
core.bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

core.bot.dialog('/', core.dialog)
    .matches('Goodbye', [scenario.goodbye])
    .matches('Thanking', [scenario.gracias])
    .matches('Greeting', [scenario.greet])
    .matches('Help', scenario.help)
    .matches('None', [scenario.none])
    .matches('Personal', [scenario.personal])
    .matches('Teaching', [scenario.teaching])
    .onDefault((session) => {
        session.send('Sorry, \'%s\' is not recognized or supported currently', session.message.text)
    });

bot.on('message', msg => {
    if (!msg.author.bot && msg.content.substr(0, cfg.prefix.length) === cfg.prefix) {
        console.log(msg)
    }
});

bot.login(process.env.DISCORD_APP_TOKEN).then(() => {
    console.log('Running discord!');
});

module.exports = core;

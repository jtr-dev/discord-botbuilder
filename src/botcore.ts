const builder = require('botbuilder');
const scenario = require('./dialogs');
import { goodbye, gracias, greetings, help, none, personal, rude, teaching } from './dialogs'

// todo: move this, without breaking process.env
require('dotenv').config();

import { DiscordConnector } from './services/discord-connector'

var core: any = {};

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
    .matches('Goodbye', goodbye)
    .matches('Thanking', gracias)
    .matches('Greeting', greetings)
    .matches('Help', help)
    .matches('Rude', rude)
    .matches('None', none)
    .matches('Personal', personal)
    .matches('Teaching', teaching)
    .onDefault(session => {
        session.send(`Sorry, ${session.message.text} is not recognized or supported currently`)
    });



export {
    core
}
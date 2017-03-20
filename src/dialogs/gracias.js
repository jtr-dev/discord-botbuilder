const disc = require('./../services/channel-demultiplexer');

const responses = [
    "You're Welcome!",
    "Glad to help",
]

module.exports = function (session){
    disc.send(session, `${responses[Math.floor(Math.random() * responses.length)]}`)
}
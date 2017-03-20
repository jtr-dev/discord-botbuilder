const disc = require('./../services/channel-demultiplexer');

const responses = [
    "Hey, how's it going",
    "Hello! Hope you're having a good day!",
]

module.exports = function (session){
    disc.send(session, `${responses[Math.floor(Math.random() * responses.length)]}`)
}
const disc = require('./../services/channel-demultiplexer');

module.exports = function (session){
     disc.send(session, "Sorry that response is not supported")
}
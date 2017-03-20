const builder = require('botbuilder'),
    entity = require('./../entities'),
    disc = require('./../services/channel-demultiplexer');

// Move helper functions and data

var helpData = {
    "commands": {
        "info": "commands info"
    },
    "creator": {
        "info": "creator info"
    },
    "code": {
        "info": "code info"
    }
}

function checkEntities(obj) {
    var res = [];
    for (var Name in obj) {
        if (obj[Name] != null) {
            res.push(obj[Name])
        }
    }
    return res[0];
}

const help = [
    function (session, args, next) {
        var entities = {}
        entity.help(session, args, entities)
        session.userData.ntt = checkEntities(entities)
        if (session.userData.ntt === undefined) {
            builder.Prompts.choice(session, "What would you like to know more about?", "commands|creator|code")
            disc.send(session, "What would you like to know more about?  commands|creator|code" )
        } else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            var choice = helpData[results.response.entity.toLowerCase()]
            // session.send(choice.info)
            disc.send(session, choice.info)
        } else {
            var choice = helpData[session.userData.ntt.entity.toLowerCase()]
            // session.send(choice.info)
            disc.send(session, choice.info)
        }
    }
]
module.exports = help
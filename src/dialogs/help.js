const builder = require('botbuilder'),
    entity = require('./../entities')

// Move helper functions and data

var helpData = {
    "commands": {
        "info": "todo: commands info"
    },
    "creator": {
        "info": "Tyler Roberts created this madness"
    },
    "code": {
        "info": "it's written in Node.js"
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
            // session.send(session, "What would you like to know more about?  commands|creator|code" )
        } else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            var choice = helpData[results.response.entity.toLowerCase()] || helpData[session.userData.ntt.entity.toLowerCase()]
            session.send(choice.info)
        }
    }
]
module.exports = help
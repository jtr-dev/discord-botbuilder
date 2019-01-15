"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require('botbuilder');
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
};
// function checkEntities(obj: any) {
//     let res = [];
//     for (let Name in obj) {
//         if (obj[Name] != null) {
//             res.push(obj[Name]);
//         }
//     }
//     return res;
// }
exports.help = [
    (session, args, next) => {
        var entities = {};
        // session.userData.ntt = checkEntities(entities)
        if (session.userData.ntt === undefined) {
            builder.Prompts.choice(session, "What would you like to know more about?", "commands|creator|code");
            // session.send(session, "What would you like to know more about?  commands|creator|code" )
        }
        else {
            next();
        }
    },
    (session, results) => {
        if (results.response) {
            var choice = helpData[results.response.entity.toLowerCase()] || helpData[session.userData.ntt.entity.toLowerCase()];
            session.send(choice.info);
        }
    }
];
//# sourceMappingURL=help.js.map
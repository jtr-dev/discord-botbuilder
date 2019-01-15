"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "I'm doing fine personally, how about you?",
    "That's good to hear!",
    "I hope better days keep coming your way!",
    "I'm always here to brighten your day :)",
];
exports.personal = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=personal.js.map
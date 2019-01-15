"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "Hey, how's it going",
    "Hello! Hope you're having a good day!",
];
exports.greetings = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=greetings.js.map
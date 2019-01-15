"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "I'm here to help, try typing !ty help"
];
exports.teaching = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=teaching.js.map
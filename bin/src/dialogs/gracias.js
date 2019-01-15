"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "You're Welcome!",
    "Glad to help",
];
exports.gracias = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=gracias.js.map
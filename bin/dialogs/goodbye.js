"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "Later",
    "See ya dude",
    "Goodbye",
    "Au revoir :)"
];
exports.goodbye = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=goodbye.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = [
    "I'll skewer you like a shish-ka-bob",
    "How appropriate! You fight like a cow!",
    "You fight like a Dairy Farmer!",
    "This is the END for you, you gutter crawling cur!",
    "I once owned a dog that was smarter than you.",
    "People fall at my feet when they see me coming!",
    "Even BEFORE they smell your breath?",
    "I'm not going to take your insolence sitting down!",
    "Your hemorroids are flaring up again eh?",
    "I once owned a dog that was smarter than you.",
    "He must have taught you everything you know.",
    "Nobody's ever drawn blood from me and nobody ever will.",
    "You run THAT fast?",
    "Have you stopped wearing diapers yet?	Why? Did you want to borrow one?",
    "There are no words for how disgusting you are."
];
exports.rude = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
    }
];
//# sourceMappingURL=rude.js.map
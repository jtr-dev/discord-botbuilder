"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botcore_1 = require("./src/botcore");
module.exports = (app) => {
    app.post("/api/messages", botcore_1.core.connector.listen());
};
//# sourceMappingURL=router.js.map
import * as express from "express";
import { core } from "./botcore";


module.exports = (app: express.Router) => {
    app.post("/api/messages", core.connector.listen());
};

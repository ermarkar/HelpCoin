"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const giuseppe_1 = require("giuseppe");
const giuseppe_reqres_plugin_1 = require("giuseppe-reqres-plugin");
const bodyparser = require("body-parser");
const nodeEnvFile = require("node-env-file");
const cookieParser = require("cookie-parser");
class Server {
    static startServer() {
        nodeEnvFile("./.env");
        const giusi = new giuseppe_1.Giuseppe();
        giusi.expressApp.use(bodyparser.json());
        giusi.expressApp.use(bodyparser.urlencoded({ extended: true }));
        giusi.expressApp.use(cookieParser());
        giusi.registerPlugin(new giuseppe_reqres_plugin_1.GiuseppeReqResPlugin());
        console.log(`Loading controllers from folder:  ${process.env.API_FOLDER}`);
        giusi.loadControllers(`${process.env.API_FOLDER}/**/*.js`)
            .then(() => {
            giusi.start(+process.env.SERVER_PORT, "/api/v1/");
            console.log(`Server is up and running on port ${process.env.SERVER_PORT}.`);
        });
    }
}
exports.Server = Server;
Server.startServer();
//# sourceMappingURL=server.js.map
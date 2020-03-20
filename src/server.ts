import { Giuseppe } from "giuseppe";
import { GiuseppeReqResPlugin } from "giuseppe-reqres-plugin";

import * as bodyparser from "body-parser";
import nodeEnvFile = require("node-env-file");
import cookieParser = require("cookie-parser");

/**
 * Launch HTTP Server apis.
 */
export class Server {

    static startServer() {
        // Load configuration file
        nodeEnvFile("./.env");

        const giusi = new Giuseppe();
        giusi.expressApp.use(bodyparser.json());
        giusi.expressApp.use(bodyparser.urlencoded({ extended: true }));
        giusi.expressApp.use(cookieParser());

        giusi.registerPlugin(new GiuseppeReqResPlugin());

        console.log(`Loading controllers from folder:  ${process.env.API_FOLDER}`);
        giusi.loadControllers(`${process.env.API_FOLDER}/**/*.js`)
            .then(() => {
                giusi.start(+process.env.SERVER_PORT, "/api/v1/");
                console.log(`Server is up and running on port ${process.env.SERVER_PORT}.`);
            });
    }
}

Server.startServer();

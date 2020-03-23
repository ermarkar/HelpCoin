import { Giuseppe } from "giuseppe";
import { GiuseppeReqResPlugin } from "giuseppe-reqres-plugin";

import * as bodyparser from "body-parser";
import express = require("express");
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
        const expressApp = giusi.expressApp;
        expressApp.use(bodyparser.json());
        expressApp.use(bodyparser.urlencoded({ extended: true }));
        expressApp.use(cookieParser());

        // static files
        expressApp.use(express.static("public"));

        giusi.registerPlugin(new GiuseppeReqResPlugin());

        console.log(`Loading controllers from folder:  ${process.env.API_FOLDER}`);
        giusi.loadControllers(`./dist/${process.env.API_FOLDER}/**/*.js`)
            .then(() => {
                giusi.start(+process.env.SERVER_PORT, "/api/v1/");
                console.log(`Server is up and running on port ${process.env.SERVER_PORT}.`);
            });
    }
}

Server.startServer();

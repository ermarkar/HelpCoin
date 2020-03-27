import { Giuseppe } from "giuseppe";
import { GiuseppeReqResPlugin } from "giuseppe-reqres-plugin";

import * as bodyparser from "body-parser";
import express = require("express");
import nodeEnvFile = require("node-env-file");
import cookieParser = require("cookie-parser");
import cors = require("cors");
import timeout = require('connect-timeout');

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
        expressApp.use(timeout("120000"));
        expressApp.use(cors());

        /* Middleware wrapper to filter specific URL path */
        const unless = function (path, middleware) {
            return function (req, res, next) {
                if (req.path.startsWith(path)) {
                    return next();
                } else {
                    return middleware(req, res, next);
                }
            };
        };

        giusi.expressApp.use(unless("/api/v1", (req, res) => {
            console.log("Path : ", req.path);
            res.sendFile(process.cwd() + "/public/index.html");
        }));

        giusi.registerPlugin(new GiuseppeReqResPlugin());

        console.log(`Loading controllers from folder:  ${process.env.API_FOLDER}`);
        giusi.loadControllers(`./dist/${process.env.API_FOLDER}/**/*.js`)
            .then(() => {
                giusi.start(+process.env.PORT, "/api/v1/");
                console.log(`Server is up and running on port ${process.env.PORT}.`);
            });
    }
}

Server.startServer();

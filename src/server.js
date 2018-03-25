/**
 * Create server and listen to port 8080
 */
var express = require('express');
var app = express();
var timeout = require('connect-timeout');
var bodyParser = require('body-parser');
var nodeEnvFile = require("node-env-file");

app.use(timeout('120000')); // request-timeout

// to parse request/response data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));

// that will include all the other web services
require('./api/services')(app);

nodeEnvFile(".env");
// create server
var server = app.listen(process.env.PORT, function () {
    console.log("App listening on : " + process.env.PORT);
});
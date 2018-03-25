/** 
 * To create pg database conenction pool
*/

const { Pool } = require('pg');
var nodeEnvFile = require("node-env-file");
nodeEnvFile(".env");

var config = {
    user: process.env.DB_USER,
    host: process.env.DB_IP,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 5, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    ssl: true
};

var pool = new Pool(config);

module.exports = {
    query: (query, callback) => {
        console.log(query);
        pool.query(query).then(response => {
            callback(null, response.rows);
        }).catch(err => {
            callback(err, null);
        })
    }
}

// String.prototype.replaceAll = function(search, replacement) {
//     var target = this;
//     return target.replace(new RegExp(search, 'g'), replacement);
// };
// var json = {name:"s'%d",class:"sda"};

// execute("getName",[json.name,json.class])

// function makeQuery(procedureName,parameters) {
// 	var query = "call " + procedureName + "(";

//   for(var i=0;i<parameters.length;i++) {
//   	var param =  parameters[i].replaceAll("'","\\'");
//     query += "'" + param.replaceAll("%","\\%");
//     query += "',"
//   }
//   query += ")";
//   return query;
// }
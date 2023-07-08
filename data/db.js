const mySql = require("mysql2");
const config = require("../config");

let connection = mySql.createConnection(config.db);
connection.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("server bağlansıtsı yapıldı");
});

module.exports = connection.promise()

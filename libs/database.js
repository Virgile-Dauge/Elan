/* This module is use to interact with the Database - Copyright Kilian CUNY - Guillaume HABEN */

database = module.exports = {
  mysql: require('mysql'),
  mySqlClient: null,

  /* Init the connection */
  connect: function (host, user, password, datab) {
    this.mysql = require('mysql');
    this.mySqlClient = this.mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: datab
    });
  },

  close: function () {
    this.mySqlClient.end();
  },

  getSQL: function () {
    return this.mySqlClient;
  },

  /* Execute a query */
  executeQuery: function (myQuery, callback) {
    var res = this.mySqlClient.query(myQuery, function select(error, results, fields) {
      if (error) {
        console.log('Query : ' + myQuery);
        console.log(error);
        return;
      }
      if (callback != undefined)
        callback(results);
      else return;
    });
  },

  /* Escape character */
  escape: function (data) {
    return this.mySqlClient.escape(data);
  }
}

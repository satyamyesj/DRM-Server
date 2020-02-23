//localhost
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database:"drm",
  queryFormat: function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  }
});

connection.connect();

module.exports=connection

//remotemysql.com
/*var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "TkNSR7mqrv",
  password: "5dYs2UJytN",
  database:"TkNSR7mqrv",
  queryFormat: function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  }
});

connection.connect();

module.exports=connection*/

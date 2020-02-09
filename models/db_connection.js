var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@netHost80",
  database:"drm"	
});

con.connect();

module.exports=con

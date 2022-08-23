const mysql = require("mysql");

// Local server (comment out before upload to aws)
var connection = mysql.createConnection({
    host: 'localhost',
    database:'dfcardb',
    user: 'root',
    password: 'password'
})

// AWS server
// const connection = mysql.createConnection({
//     host: 'docfiledb-t2.cxljlbpdqrxq.ap-southeast-1.rds.amazonaws.com',
//     database:'docufiledb',
//     user: 'admin',
//     password: 'NypCiti2022'
// })

module.exports = connection;
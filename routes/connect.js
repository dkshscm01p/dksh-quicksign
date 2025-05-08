let mysql = require('mysql');
let conn = mysql.createConnection({
    host: 'localhost:3306',
    user: 'THSCM',
    password: 'b21w5Kr6_',
    database: 'lsssmart_booking_slot'
})

conn.connect((err) => {

    if (err) throw err;
    console.log('connect database successfully');
})

module.exports = conn;
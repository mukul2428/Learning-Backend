const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "node_js"
});
con.connect((err) => {
    if (err) {
        console.warn("not connected", err)
    } else {
        console.warn("connected!!!")
    }
})
module.exports = con; 

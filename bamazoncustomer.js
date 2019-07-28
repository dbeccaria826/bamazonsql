const mysql = require("mysql")
const root_password = require("./password")
// setting up mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: root_password.id,
    database: 'bamazon'
})

connection.connect((error) => {
    if(error) {
        console.log(error)
    }
    console.log("Connection Success")
})




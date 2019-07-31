
const mysql = require("mysql")
const table = require("cli-table")
const root_password = require("./password")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: root_password.id,
    database: 'bamazon'
})
const superTable = new table({
    head: ["DEPARTMENT NAME", "DEPARTMENT SALES"],
    colWidths: [20, 20]
})
let superVisor = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'Welcome',
            choices:['View Product Sales by Department','Creat New Department']
        }
    ]).then(response => {
        switch(response.action) {
            case 'View Product Sales by Department':
                //function
                break;
            case 'Create New Department':
                //function
                break;
            default:
                console.log("You'll never get a promotion")
        }
    })
}

//Collecting aggregate data from customer table
// let getDepartmentSales = () => {
//     connection.query("SELECT SUM(sales) FROM inventory GROUP BY department", (error, results)=> {
//         for(let item in results) {
//             console.log(results[item])
//         }
//     })
//     connection.end()
    
// }

// getDepartmentSales()

let getTotalSales = () => {
    connection.query("SELECT department FROM inventory GROUP BY department", (error, result) => {
       for(let item in result) {
           console.log(result[item])
       }
    })
    connection.end()
}




superVisor()
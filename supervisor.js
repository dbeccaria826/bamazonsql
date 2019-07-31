
const mysql = require("mysql")
const table = require("cli-table")
const root_password = require("./password")
const inquirer = require("inquirer")
//Needs: To calculate profit based on total sales (GROUP BY/JOIN/ALIASES)
//Add a new department
//Exit option
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: root_password.id,
    database: 'bamazon'
})
const superTable = new table({
    head: ["DEPARTMENT ID", "DEPARTMENT NAME","OVER HEAD","SALES","PROFIT"],
    colWidths: [10, 20, 20, 20,20]
})
let superVisor = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'Welcome',
            choices:['View Product Sales by Department','Creat New Department','Exit']
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
//     connection.query("SELECT SUM(sales) AS product_sales FROM inventory GROUP BY department", (error, results)=> {
//         for(let item in results) {
//             console.log(results[item])
//         }
//     })
//     connection.end()
    
// }

// getDepartmentSales()

// let getTotalSales = () => {
//     connection.query("SELECT departments FROM inventory GROUP BY department", (error, result) => {
//        for(let item in result) {
//            console.log(result[item])
//        }
//     })
//     connection.end()
// }


// getTotalSales()

// superVisor()


let getProfit = () => {
    connection.query("SELECT department_id, departments.department_name, over_head_costs, SUM(sales) AS product_sales, SUM(sales) - over_head_costs AS total_profit FROM departments INNER JOIN inventory ON departments.department_name = inventory.department_name GROUP BY department_id", (err, res) => {
        // console.log(res)
        for(item in res) {
            let nonProfit = res[item];
            superTable.push([nonProfit.department_id, nonProfit.department_name, nonProfit.over_head_costs, nonProfit.product_sales, nonProfit.total_profit])
        }
        console.log(superTable.toString())
    })
    connection.end()
}
getProfit()
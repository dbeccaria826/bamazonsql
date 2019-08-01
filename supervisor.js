
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
            choices:['View Product Sales by Department','Create New Department','Exit']
        }
    ]).then(response => {
        switch(response.action) {
            case 'View Product Sales by Department':
                getProfit()
                break;
            case 'Create New Department':
                createNewDepartment()
                break;
            default:
                console.log("See you later")
                connection.end()
        }
    })
}
let createNewDepartment = () => {
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"Department Name",
            validate: function(name) {
                return /^\w\D*/.test(name)
            }
            
        },
        {
            type:"input",
            name:"overhead",
            message:"Enter Over Head Costs",
            validate:function(name) {
                return /^\d*/.test(name)
            }
            
                
        }
        
    ]).then(res => {
        connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES ('${res.name}','${res.overhead}')`,(err, res) => {
            if(err) throw err
            console.log("Department Created...")
        })
        connection.end()
    })
}
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
// createNewDepartment()
superVisor()


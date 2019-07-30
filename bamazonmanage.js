const mysql = require("mysql")
const root_password = require("./password")
const table = require("cli-table")
const inquirer = require("inquirer")
// setting up mysql connection
//EASY PART: SETTING THIS UP
//Hard Part: Logic.

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: root_password.id,
    database: 'bamazon'
})
const viewTable = new table({
    head: ["ITEM_ID", "ITEM_NAME","CATEGORY", "PRICE", "QUANTITY", "SALES"],
    colWidths: [10, 30, 30, 15, 15, 15]
})
let pushTable = (viewTable, results) => {
    for (let item in results) {
        let info = results[item]
        viewTable.push([info.item_id, info.item_name, info.category_name, `$${info.price}`, info.quantity, info.sales])

    }
}
let manager = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'manager',
            message:'List of currently stocked products',
            choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
        }
    ]).then(manage => {
        switch(manage.manager) {
            case 'View Products for Sale':
                viewInventory()
                break;
            case 'View Low Inventory':
                viewLowInventory()
                break;
            case 'Add to Inventory':
                //function
                break;
            case 'Add New Product':
                //function
                break;
            default:
                console.log("something bad happened")
        }
    })

}


let viewInventory = () => {
   
    connection.connect((error) =>{
        if(error) throw error
    }) 
        
    
    connection.query("SELECT * FROM inventory", (err, results) => {
        // console.log(results)
        pushTable(viewTable, results)
        console.log(viewTable.toString())
    })
    
    connection.end()
}

let viewLowInventory = () => {
   
    connection.connect((error) => {
        if(error) throw error
    })

    connection.query("SELECT * FROM inventory WHERE quantity < 10", (error, results) => {
        pushTable(viewTable, results)
        console.log(viewTable.toString())
    })
    connection.end()
}

//Add to inventory, separate prompt
// manager()
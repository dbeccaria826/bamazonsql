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
    head: ["ITEM_ID", "ITEM_NAME","DEPARTMENT", "PRICE", "QUANTITY"],
    colWidths: [10, 30, 30, 15, 15]
})
let pushTable = (viewTable, results) => {
    for (let item in results) {
        let info = results[item]
        viewTable.push([info.item_id, info.item_name, info.department_name, `$${info.price}`, info.quantity])

    }
}
let manager = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'manager',
            message:'List of currently stocked products',
            choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','I Came Here By Accident']
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
                addToInventory()
                break;
            case 'Add New Product':
                addNewItem()
                break;
            default:
                console.log("You're not a manager!")
                connection.end()
        }
    })

}


let viewInventory = () => {
   connection.query("SELECT * FROM inventory", (err, results) => {
        // console.log(results)
        pushTable(viewTable, results)
        console.log(viewTable.toString())
    })
    
   connection.end()
   
}

let viewLowInventory = () => {
   connection.query("SELECT * FROM inventory WHERE quantity < 20", (error, results) => {
        pushTable(viewTable, results)
        console.log(viewTable.toString())
    })
  connection.end()
}

//Add to inventory, separate prompt, allows manager to update inventory (order more of a product)
let addToInventory = () => {
    
    inquirer.prompt([
        {
            type:'input',
            name:'id',
            message:'Select Item to Update',
            validate:function(name) {
                return /^[0-9]*$/.test(name)
            }
        },
        {
            type:'input',
            name:'add',
            message:'Add items to inventory',
            validate: function (name) {
                 return /^[0-9]*$/.test(name)
            }
        }
    ]).then(response => {
       connection.query("UPDATE inventory SET quantity = quantity + ? WHERE item_id = ?", [response.add, response.id], (error, show) => {
            if (error) throw error
        })
        connection.end()
   
    })
   
}
let addNewItem = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'itemname',
            message:'Enter item name',
        },
        {
            type:'input',
            name:'category',
            message:'Enter category',
        },
        {
            type:'input',
            name: 'price',
            message:'Enter price',
            validate: function(name) {
                return /^\d{0,4}(\.\d{1,2})?$/.test(name)
            }
        },
        {
            type:'input',
            name:'quantity',
            message:'Enter Quantity',
            validate:function(name) {
                return /^[0-9]*$/.test(name)
            }
        }
        
    ]).then(response => {
        connection.query(`INSERT INTO inventory (item_name, department_name, price, quantity) VALUES ('${response.itemname}','${response.category}','${response.price}','${response.quantity}')`, (error, results) => {
            if(error) throw error
            console.log(results)
        })
        connection.end()
    })
}

manager()

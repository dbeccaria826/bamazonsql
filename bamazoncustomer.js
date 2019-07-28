const mysql = require("mysql")
const root_password = require("./password")
const table = require("cli-table")
const inquirer = require("inquirer")
// setting up mysql connection


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: root_password.id,
    database: 'bamazon'
})



//User wants to make a selection if they decide to buy anything
//Return a list of items person can choose from and place into their "cart"
//Get the total price of all the items when person is finished shopping
//Update database with current number of items purchased in stock after purchase
let getCustomer = () => {
    inquirer.prompt([
        {
            type:"list",
            name:"sale",
            message:"Interested in buying anything?",
            choices: ["Yes", "I said Good Day!"]
    
        }
    ]).then(response => {
        response.sale === "Yes" ? inventory() : console.log("Come back soon")
        
    })
}



let inventory = () => {

    connection.connect((error) => {
        if(error) throw error
        // console.log("Connection Success")
    })

    connection.query("SELECT * FROM inventory", (error, results) => {
        const productTable = new table( {
            head: ["ITEM_ID", "ITEM_NAME","CATEGORY", "PRICE"],
            colWidths: [20, 50, 30, 30]
        })

        if(error) throw error
        // console.log(results)
    
        
        for(let item in results) {
            let info = results[item]
            
            // console.log(`${results[item].item_id} ${results[item].item_name} ${results[item].category_name}`)
            productTable.push([info.item_id, info.item_name, info.category_name, `$${info.price}`])
        }
        console.log(productTable.toString())
    })
}

getCustomer()
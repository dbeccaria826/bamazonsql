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
const productTable = new table( {
    head: ["ITEM_ID", "ITEM_NAME","CATEGORY", "PRICE"],
    colWidths: [20, 50, 30, 30]
})
let pushTable = (productTable,a,b,c,d) => {
     
    return productTable.push([a,b,c,d])
}

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
       

        if(error) throw error
        // console.log(results)
    
        
        for(let item in results) {
            let info = results[item]
            
            // console.log(`${results[item].item_id} ${results[item].item_name} ${results[item].category_name}`)
            // productTable.push([info.item_id, info.item_name, info.category_name, `$${info.price}`])
            pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
        }
        console.log(productTable.toString())
    })
}



let sortItems = () => {
    inquirer.prompt([
        {
            type:"list",
            name:"categories",
            message:"Anything in particular?",
            choices:['Hardware','Electronics','Fashion','Literature','Scholarly','Sports','General']
        }
    ]).then(response => {
        switch(response.categories) {
            case "Hardware":
                whichItems()
                break;
            case "Electronics":
                whichItems()
                break;
            case "Fashion":
                whichItems()
                break;
            case "Literature":
                whichItems()
                break;
            case "Sports":
                whichItems()
                break;
            case "Scholarly":
                whichItems()
                break;
            default:
                console.log('oops')
        }
    })
}

let whichItems = () => {
    connection.connect((error) => {
        if(error) throw error

    })

    connection.query("SELECT * FROM inventory WHERE category_name='Hardware' OR category_name='Electronics'OR category_name='Fasion' OR category_name='Literature' OR category_name='Scholarly' OR category_name='Sports'", (error, results) => {
        if(error) throw error
        
        for(let item in results) {
            let info = results[item]
            pushTable(productTable, info.item_id, info.item_name, info.category_name, `$${info.price}`)
        }
        console.log(productTable.toString())
    })

}
sortItems()
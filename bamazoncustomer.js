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
        response.sale === "Yes" ? sortItems() : console.log("Come back soon")


})
}

//Shows the whole table (without filtered results)
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
            pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
        }
        console.log(productTable.toString())
    })
    setTimeout(() => {
       makePurchase() 
    }, 500);
   
}


//Gives person a choice to narrow down what they might want to buy
let sortItems = () => {
    inquirer.prompt([
        {
            type:"list",
            name:"categories",
            message:"Anything in particular?",
            choices:['Hardware','Electronics','Fashion','Literature','Sports','All']
        }
    ]).then(response => {
        switch(response.categories) {
            case "Hardware":
                whichItems('Hardware')
                break;
            case "Electronics":
                whichItems('Electronics')
                break;
            case "Fashion":
                whichItems('Fashion')
                break;
            case "Literature":
                whichItems('Literature')
                break;
            case "Sports":
                whichItems('Sports')
                break;
            case "Scholarly":
                whichItems('Scholarly')
                break;
            default:
              inventory()
        }
    })
  
}
//Sorts items from db based on choice made
let whichItems = (catName) => {
    connection.connect((error) => {
        if(error) throw error

    })

    connection.query(`SELECT * FROM inventory WHERE category_name='${catName}'`, (error, results) => {
        if(error) throw error
        
      
            getItems(catName, results)
        
        console.log(productTable.toString())
    })
    setTimeout(() => {
        makePurchase()
    }, 500); 
}

let getItems = (catName, results) => {
    for(let item in results) {
        let info = results[item]
        switch(catName) {
            case "Hardware":
                pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
               
                break;
            case "Fashion":
                pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
                break;
            case "Electronics":
                pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
                break;
            case "Literature":
                pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
                break;
            case "Sports":
                pushTable(productTable,info.item_id, info.item_name, info.category_name, `$${info.price}`)
                break;
            default:
               inventory()
            
        }
}
}

// getCustomer()
// When a purchase is made the stock or quantity has to be updated however many of the items someone purchased.
// This has to happen every time.
// If an item is out of stock it can be deleted from the base and the person can be notified.
// JOIN INNER UPDATE
let makePurchase = () => {
    
    // console.log('Select Item by ID')
    inquirer.prompt([
        {
            type:'input',
            name:'select',
            message:"Select Item by ID",
            validate: function(name) {
                return /^[0-9]*$/.test(name)
            }
            
        },
        {
            type:'input',
            name:'howmany',
            message:'How many of this item?',
            validate: function(name) {
                return /^[0-9]*$/.test(name)
            }
        }
    ]).then(response => {
        
        connection.query(`SELECT * FROM inventory WHERE item_id='${response.select}'`, (error, result) => {
            if(error) throw error
            
            //What happens if a customer puts in 0 for howmany? 
            //Controlling customer response
            for(let item in result) {
                let info = result[item];
                
                if(response.howmany > info.quantity) {
                    console.log("Out of Stock!")
                } else if (response.howmany > 0) {
                   let customerTotal = response.howmany * info.price
                    console.log(`Your new total is ${customerTotal}`)
                }
            }
            //We get the response, which one and how many
            
           
        })
            
       
        connection.query("UPDATE inventory SET quantity = quantity - ? WHERE item_id = ?", [response.howmany, response.select] , (error,show) => {
            if(error) throw error

            // console.log(show)
            
        }) 
        connection.query("UPDATE inventory SET sales = ? WHERE item_id = ?", [response.howmany, response.select], (error, show) => {
            if(error) throw error
            console.log(show)
        })
        connection.end()
        setTimeout(() => {
            getCustomer()
        }, 1000);
       
    })
    
}
//Need to display the person's total after they've selected how many of what item to purchase

//console.log('Your new total') response.howmany + info.price how many user wants + price of the item
getCustomer()
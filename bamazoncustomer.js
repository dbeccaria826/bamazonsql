const mysql = require("mysql")
const root_password = require("./password")
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
inquirer.prompt([
    {
        type:"list",
        name:"sale",
        message:"Interested in buying anything?",
        choices: ["Yes", "I said Good Day!"]

    }
]).then(response => {
    response.sale === "Yes" ? fundMyLifeStyle() : console.log("Jeff Bezos is creepy")
    
})


let fundMyLifeStyle = () => {

    connection.connect((error) => {
        if(error) throw error
        // console.log("Connection Success")
    })

    connection.query("SELECT * FROM inventory", (error, results) => {
        if(error) throw error
        // console.log(results)
    
        for(let item in results) {
            // console.log(results[item])
            // console.log(`${results[item].item_id} ${results[item].item_name} ${results[item].category_name}`)
            console.log(`Item Name: ${results[item].item_name} Price: ${results[item].price}`)
        }
    })
}

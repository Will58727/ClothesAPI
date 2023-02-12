let express = require('express');
let json = require('./data/inventory.json');

require('dotenv').config();

let app = express();
let inventory = json.items;

//console.log(inventory);

//GET request to the root of the trigger "Hello world" being logged to the console.
// app.get('/', (req, res) => {
//     console.log('Hello World!');
//     res.send('Hello World!');

// });

const pathToIndex = __dirname + "/views/index.html"
app.get('/', (req, res) => res.sendFile(pathToIndex));

//GET request to /inventory and serve the entire inventory json to the client

app.get('/inventory', (req, res) => {
    res.json(inventory);
});

//GET request to /inventory/item/:name should return json for that specific item
app.get('/inventory/item/:name', (req, res) => {
    let item = inventory.find(item => item.name === req.params.name);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// 3-5 new GET request thats just different
// tuesday

//GET request to /inventory/firstItem, should return the first item in the inventory

app.get('/inventory/firstItem', (req, res) => {
    res.json(inventory[0]);
});


module.exports = app;
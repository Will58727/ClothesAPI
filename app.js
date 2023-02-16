let express = require('express');
let json = require('./data/inventory.json');

require('dotenv').config();

let app = express();
let inventory = json.items;

app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);


app.use(express.static('public'));



//console.log(inventory);

//GET request to the root of the trigger "Hello world" being logged to the console.
// app.get('/', (req, res) => {
//     console.log('Hello World!');
//     res.send('Hello World!');

// });

const pathToIndex = __dirname + "/views/index.html"
app.get('/', (req, res) => res.sendFile(pathToIndex));

const pathToForm = __dirname + "/views/form.html"
app.get('/form', (req, res) => res.sendFile(pathToForm));

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

//GET request to /inventory and return all items with a size of xl
app.get('/inventory/:name/size/xl', (req, res) => {
    res.json(inventory.filter(item => item.size === 'xl'));
});

//GET request to /inventory and return all items that are in stock
app.get('/inventory/inStock', (req, res) => {
    res.json(inventory.filter(item => item.inStock === true));
});

//get request for all items that are not in stock
app.get('/inventory/notInStock', (req, res) => {
    let responseString = ''
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        let colors = item.colors;
        for (let j = 0; j < colors.length; j++) {
            let sizes = Object.values(colors[j].sizes);
            if (sizes.reduce((x, y) => x + y) == 0) {
                responseString += `the ${colors[j].color_name} ${item.name} is out of stock`
            }
        }
    }
    res.send(responseString);
});

//get request to get image location and description for specified item
//use name as route parameter; response displays name, image location and description in the browser
app.get('/inventory/item/:name/description', (req, res) => {
    let item = inventory.find(item => item.name === req.params.name);
    if (item) {
        res.json(`picture of our ${item.name}is located at ${item.path_to_image} and labeled with description ${item.description}`);
    } else {
        res.status(404).send('Item not found');
    }
}); 

//GET request to get completely out of stock items
app.get('/inventory/outOfStock', (req, res) => {
    res.send(getOutOfStockItems());
});


//function to get completely out of stock items
function getOutOfStockItems() {
    let responseString = ''
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        let colors = item.colors;
        for (let j = 0; j < colors.length; j++) {
            let sizes = Object.values(colors[j].sizes);
            if (sizes.reduce((x, y) => x + y) == 0) {
                responseString += `the ${colors[j].color_name} ${item.name} is out of stock`
            }
        }
    }
    return(responseString);
};



//post request to get the form from contact-signup.html
app.post('/contact-signup', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    console.log(req.body);
    console.log(`${name}'s email is ${email}`);
    res.send(`Thanks for signing up, ${name}!`);
});

//logger middleware
app.get(function (req, res, next) {
    console.log(`${req.method} request was made to path ${req.path} byIP: ${req.ip}`);
    next();
});


module.exports = app;


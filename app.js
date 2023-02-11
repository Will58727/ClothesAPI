let express = require('express');
let json = require('./data/inventory.json');

require('dotenv').config();

let app = express();
let inventory = json.items;

console.log(inventory);

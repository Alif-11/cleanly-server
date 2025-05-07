
// get all the dependencies in order
const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')


// use environment variables
require('dotenv').config()
const { DB_URL, SERVER_APP, PORT } = process.env
console.log(process.env)

// connect to mongoose
mongoose.connect("mongodb://localhost/laundra").then(() => {
  console.log("mongoose connection");
})
const db = mongoose.connection

// model definitions
const PatronsModel = require('../models/patrons')
const ErrandsModel = require('../models/errands')
const RunnersModel = require('../models/runners')


// mongoose database event handlers
db.once('open', () => {
  console.log("database open");
})

db.on('error', (err) => {
  console.log('database error')
  console.log(err)
})

// cors Options 
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json())


app.get('/', (req, res) => {
  console.log("SERVER hit the home page");
  res.send("CLIENT hit the home page");
})


app.get("/intake", (req, res) => res.send("How did you get here?"));

app.listen(8080, () => console.log("Server ready on port 8080."));

module.exports = app;
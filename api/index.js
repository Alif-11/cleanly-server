
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

// allows you to signup, for both patrons and runners
app.post("/signup", async (req, res) => {
  console.log(`Here is the request: ${req}. Here is the request body: ${req.body}. Here is the request body password: ${req.body.password}.`);

  // the password used to sign in
  //console.log(req.body.password);
  // whether or not we are a patron or runner that is signing in
  console.log("parent", req.body.parent);

  let data = [];
  if (req.body.parent == "patron") {
    await PatronsModel.find({ username: req.body.username }).then(bob => {
      //console.log(bob);
      data = bob;
    });
    console.log("data");
    console.log(data);
    if (data.length === 0) { // this is a new signup
      data = {
        username: req.body.username,
        password: req.body.password
      }
      const patronSchemaObject = new PatronsModel(data);
      patronSchemaObject.save();
    } else {
      data = [];
      console.log("This user already exists.")
    }
  } else if (req.body.parent == "runner") {
    await RunnersModel.find({ username: req.body.username }).then(bob => {
      //console.log(bob);
      data = bob;
    });
    console.log("data");
    console.log(data);
    if (data.length === 0) { // this is a new signup
      data = {
        username: req.body.username,
        password: req.body.password
      }
      let runnerSchemaObject = new RunnersModel(data);
      runnerSchemaObject.save();
    } else {
      data = [];
      console.log("This user already exists.")
    }

  }

  console.log("Ooga");
  console.log(data);

  res.json({
    message: "signup endpoint accessed and response",
    data,
  });

});


app.post("/name", (req, res) => {
  console.log(req);
  console.log(req.body);
  res.json({ message: "name endpoint response" });
});


app.get("/intake", (req, res) => res.send("How did you get here?"));

app.listen(8080, () => console.log("Server ready on port 8080."));

module.exports = app;
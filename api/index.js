const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')



require('dotenv').config()
const { DB_URL, SERVER_APP, PORT } = process.env
console.log(process.env)


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
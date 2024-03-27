require('dotenv').config()
const express = require('express')
const cors = require("cors")

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://trabalho-six-pink.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// Connection in the DB
require('./db/conn')

// Routes


const routes = require('./routes/Routes')

app.use(routes)





app.listen(port, ()=> {
    console.log("Server running")
})
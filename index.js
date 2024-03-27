require('dotenv').config()
const express = require('express')
const cors = require("cors")

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())



// Connection in the DB
require('./db/conn')

// Routes


const routes = require('./routes/Routes')

app.use(routes)





app.listen(port, ()=> {
    console.log("Server running")
})
require('dotenv').config()
const express = require('express')
const cors = require("cors")

const app = express()

const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

// Connection in the DB
require('./db/conn')

// Routes


const routes = require('./routes/Routes')

app.use(routes)





app.listen(port, ()=> {
    console.log("Server running")
})
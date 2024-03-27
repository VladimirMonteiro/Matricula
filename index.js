require('dotenv').config()
const express = require('express')
const cors = require("cors")

const app = express()

const port = 5000


app.use(cors({credentials: true, origin: '*'}))
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())

// Connection in the DB
require('./db/conn')

// Routes


const routes = require('./routes/Routes')

app.use(routes)





app.listen(port, ()=> {
    console.log("Server running")
})
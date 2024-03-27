const express = require('express')

const router = express()


// Student routes
router.use('/student', require('./StudentRoutes'))



router.get('/', (req, res) => {
    res.send("Api working successfull!")
})


module.exports = router
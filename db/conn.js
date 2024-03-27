const mongoose = require('mongoose')



const connection = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pvelxpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=> {
    console.log('Connect MongoDB')
}).catch(error => console.log(error))




module.exports = connection
//FnRY51RDizYdgcZ2
//vladimirMonteiro


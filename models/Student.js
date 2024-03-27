const mongoose = require("mongoose")
const {Schema} = require('mongoose')




const StudentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    course: {type: String, required: true},
    registration: {type: Array}
}, {timestamps: true})



const Student = mongoose.model('Student', StudentSchema)



module.exports = Student
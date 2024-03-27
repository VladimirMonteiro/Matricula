const mongoose = require("mongoose")
const {Schema} = require('mongoose')





const turmaSchema = new Schema({
    teacher: {type: String, required: true},
    students: {type: Object},
    discipline: {type: Array},
    horario: {type: String, required: true},
    turno: {type: String, required: true},
    dia: {type: String, required: true}
}, {timestamps: true})



const Turma = mongoose.model('Turma', turmaSchema)




module.exports = Turma
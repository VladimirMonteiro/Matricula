const mongoose = require('mongoose')
const {Schema} = require('mongoose')




const courseSchema = new Schema({
    name: { type: String, required: true },
    disciplines: [{
        nome: { type: String, required: true },
        professor: { type: String, required: true },
        alunos: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
        turmas: [{
            horario: { type: String, required: true },
            turno: { type: String, required: true },
            dia: { type: String, required: true }
        }]
    }]
}, {timestamps: true});


const Course = mongoose.model('Course', courseSchema)


module.exports = Course

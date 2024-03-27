const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: true },
    disciplines: { type: Array },
    turmas: [{ type: ObjectId }] // turmas é um array de ObjectIds
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

const Course = require('../models/Course')
const Turma = require('../models/Turma')



module.exports = class CourseController {


    static async createCourse(req, res) {

       
        const {name, disciplines, turmas} = req.body
    

        if (!name) {
            res.status(401).json({ error: "O nome é obrigatório." })
            return
        }
        if (!disciplines) {
            res.status(401).json({ error: "A disciplina é  é obrigatória." })
            return
        }
        if (!turmas) {
            res.status(401).json({ error: "as turmas é obrigatório." })
            return
        }




        
        const course = {
            name,
            disciplines,
            turmas
        }

        try {

            const newCourse = await Course.create(course)
            res.status(201).json(newCourse)


            
        } catch (error) {
            res.status(500).json({error})
            
        }





    }


}
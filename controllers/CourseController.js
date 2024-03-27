const Course = require('../models/Course')
const Student = require('../models/Student')



module.exports = class CourseController {


    static async createCourse(req, res) {

       
        const {name, ...disciplines} = req.body


        if (!name) {
            res.status(401).json({ error: "O nome é obrigatório." })
            return
        }


        
        const course = {
            name,
            disciplines: [{
                name,
                turmas: {
                   disciplines,
                    alunos,
                    horario,
                    turno,
                    dia
                }
                
            }]
        }

        try {

            const newCourse = await Course.create(course)
            res.status(201).json(newCourse)


            
        } catch (error) {
            res.status(500).json({error})
            
        }





    }


}
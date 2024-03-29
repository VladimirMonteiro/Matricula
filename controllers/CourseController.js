const Course = require('../models/Course')
const Turma = require('../models/Turma')
const Student = require('../models/Student')



module.exports = class CourseController {


    static async createCourse(req, res) {

       
        const {name, disciplines} = req.body
    

        if (!name) {
            res.status(401).json({ error: "O nome é obrigatório." })
            return
        }
        if (!disciplines) {
            res.status(401).json({ error: "A disciplina é  é obrigatória." })
            return
        }
       

        
        const course = {
            name,
            disciplines,
        
        }

        try {

            const newCourse = await Course.create(course)
            res.status(201).json({newCourse, message: "Curso criado com sucesso!"})


            
        } catch (error) {
            res.status(500).json({error})
            
        }





    }

    static async getAllCoursesAndTurmas(req, res) {


      try {
        const turmas = await Turma.find()
        const courses = await Course.find()
        const students = await Student.find()

        const data = {
            turmas,
            courses,
            students
        }

        res.status(200).json(data)

        
      } catch (error) {
        res.status(500).json({error: error})
        
      }


    }


}
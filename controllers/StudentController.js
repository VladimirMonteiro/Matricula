const Student = require('../models/Student')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = require("../helpers/createToken")


module.exports = class StudentController {



    static async register(req, res) {


        const { name, email, password, confirmPassword, course } = req.body


        if (!name) {
            res.status(401).json({ error: "O nome é obrigatório." })
            return
        }

        if (!email) {
            res.status(401).json({ error: "O e-mail é obrigatório." })
            return
        }



        if (!password) {
            res.status(401).json({ error: "A senha é obrigatória." })
            return
        }
        if (!confirmPassword) {
            res.status(401).json({ error: "A confirmação de senha é obrigatório." })
            return
        }

        if (password !== confirmPassword) {
            res.status(401).json({ error: "As senhas nâo conferem." })
            return
        }

        if(!course || ''){
            res.status(401).json({error: "O curso é obrigatório."})
            return
        }


        const checkIfUserExists = await Student.findOne({ email: email })

        if (checkIfUserExists) {
            res.status(422).json({ error: "Aluno ja cadastrado." })
            return
        }


        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)


        const student = {
            name,
            email,
            course,
            password: passwordHash


        }



        try {

            const newStudent = await Student.create(student)


            res.status(201).json({ message: "Conta criada com sucesso!", newStudent, token: createToken(newStudent._id) })



        } catch (error) {
            res.status(501).json({ error })

        }





    }


    static async login(req, res) {

        const { email, password } = req.body


        if (!email) {
            res.status(401).json({ error: "O e-mail é obrigatório." })
            return
        }

        if (!password) {
            res.status(401).json({ error: "A senha é obrigatória." })
            return
        }

        const student = await Student.findOne({ email: email })

        if (!student) {
            res.status(422).json({ error: "E-mail ou senha inválidos." })
            return
        }


        const passwordDecoded = await bcrypt.compare(password, student.password)



        if (passwordDecoded === false) {
            res.status(422).json({ error: "E-mail ou senha inválidos." })
            return
        }


        res.status(200).json({ studentId: student._id, token: createToken(student._id) })


    }


    static async getStudentById(req, res) {

        const { id } = req.params

        const student = await Student.findById(id)

        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado." })
            return
        }

        res.status(200).json(student)




    }

    static async disciplineRegistration(req, res) {

        const {id} = req.params
        let {disciplines} = req.body

        disciplines = [...disciplines]


        const student = await Student.findById(id)

        if(!student){
            res.status(404).json({error: "Estudante não encontrado."})
            return
        }

        if(disciplines.length <= 0){
            res.status(422).json({error: "É necessário se matricular no minímo em uma displina."})
            return
        }

        student.registration = disciplines

    

        try {

            const updatedStudent = await student.save()
            res.status(200).json(updatedStudent)


            
        } catch (error) {
            res.status(401).json({error: error})
            
        }







    }


}
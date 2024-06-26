const Student = require('../models/Student')
const Turma = require('../models/Turma')
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

        if (!course || '') {
            res.status(401).json({ error: "O curso é obrigatório." })
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

        const student = await Student.findOne({ email: email }).select('+password');


        if (!student) {
            res.status(422).json({ error: "E-mail ou senha inválidos." })
            return
        }


        const passwordDecoded = await bcrypt.compare(password, student.password)



        if (passwordDecoded === false) {
            res.status(422).json({ error: "E-mail ou senha inválidos." })
            return
        }


        //res.status(200).json({ studentId: student._id, token: createToken(student._id), isStudent: student.isStudent, course: student.course, disciplines: student.disciplines})
        res.status(200).json({ student, token: createToken(student._id) })


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

        const { id } = req.params
        let { idTurma } = req.body


        const student = await Student.findById(id)
        const turma = await Turma.findById(idTurma)
     


        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado." })
            return
        }
        if (!turma) {
            res.status(404).json({ error: "Turma não encontrado." })
            return
        }

        for (const discipline of student.disciplines) {
            if (discipline === turma.discipline) {
                return res.status(422).json({ error: "Aluno já matriculado." });
            }
        }



        student.disciplines.push(turma.discipline)
        turma.vagas -= 1
        turma.students.push(id)



        try {

            const updatedStudent = await student.save()
            await turma.save()
            res.status(200).json({message: "Aluno matriculado com sucesso!"})



        } catch (error) {
            res.status(401).json({ error: error })

        }







    }


    // xxx

    static async createTurma(req, res) {


        const { teacher, vagas, course, horario, turno, dia, discipline } = req.body



        if (!teacher) {
            res.status(401).json({ error: "O professor é obrigatório." })
            return
        }

        if (!vagas) {
            res.status(401).json({ error: "As Vagas são obrigatórias." })
            return
        }
        if (!horario) {
            res.status(401).json({ error: "O horário é obrigatório." })
            return
        }
        if (!turno) {
            res.status(401).json({ error: "O turno é obrigatório." })
            return
        }
        if (!dia) {
            res.status(401).json({ error: "O dia é obrigatório." })
            return
        }



        const turma = {
            teacher,
            turno,
            discipline,
            course,
            vagas,
            horario,
            dia
        }

        try {

            const newTurma = await Turma.create(turma)
            res.status(201).json({ newTurma, message: "Turma criada com sucesso!" })

        } catch (error) {
            res.status(500).json({ error: error })

        }
    }



}
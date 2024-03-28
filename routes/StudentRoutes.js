const express = require('express')
const router = express.Router()


// Controller

const StudentController = require("../controllers/StudentController")
const authGuard = require('../helpers/authGuard')



router.post('/register', StudentController.register)
router.post('/login', StudentController.login)
router.get('/get-student-by-id', StudentController.getStudentById)
router.put('/register-disciplines/:id', authGuard,StudentController.disciplineRegistration)

router.post('/createturma',authGuard, StudentController.createTurma)





module.exports = router

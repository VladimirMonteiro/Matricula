const express = require('express')
const router = express.Router()


const CourseController = require('../controllers/CourseController')
const authGuard = require('../helpers/authGuard')


router.post('/create',authGuard, CourseController.createCourse)


module.exports = router
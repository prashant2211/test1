
const express       = require('express')
const router        = express.Router()

const StudentController = require('../controller/studentController')
const authenticate       = require('../middleware/authenticate')


router.get('/get-all-student',authenticate, StudentController.index)
router.get('/get-byid-student', authenticate, StudentController.show)
router.post('/student-Register', authenticate, StudentController.store)
router.patch('/update', authenticate, StudentController.update)
router.patch('/deactivate-student', authenticate, authenticate, StudentController.remove)
router.delete('/delete', authenticate, StudentController.destroy)

module.exports = router 
const express       = require('express')
const router        = express.Router()
const TeacherController = require('../controller/teacherController')
const authenticate       = require('../middleware/authenticate')


router.get('/get-all-Teacher',authenticate,TeacherController.index)
router.get('/:id',authenticate, TeacherController.show)
router.post('/teacher-Register',authenticate, TeacherController.store)
router.patch('/update',authenticate, TeacherController.update)
router.patch('/deactive-teacher', authenticate, TeacherController.remove)
router.delete('/delete',authenticate, TeacherController.destroy)

module.exports = router
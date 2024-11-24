const express       = require('express')
const router        = express.Router()

const adminissionController = require('../controller/admissionController')
const authenticate       = require('../middleware/authenticate')

router.get('/get-all-admission-info', authenticate, adminissionController.index)
router.get('/get-admission-info-byId', authenticate, adminissionController.show)
router.post('/registration', authenticate, adminissionController.store)
router.patch('/update-admission-info', authenticate, adminissionController.update)
router.delete('/deleteadmission-info', authenticate, adminissionController.destroy)

module.exports = router
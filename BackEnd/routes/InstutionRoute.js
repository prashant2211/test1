
const express       = require('express')
const router        = express.Router()

const instutionController = require('../controller/InstutionRegistrationController')
const authenticate       = require('../middleware/authenticate')


router.get('/get-all-instution',authenticate, instutionController.index)
router.get('/get-byid-instution', authenticate, instutionController.show)
router.post('/instution-Register',authenticate, instutionController.store)
router.patch('/update-instution', authenticate, instutionController.update)
router.patch('/deactivate-instution', authenticate, instutionController.remove)
router.delete('/delete-instution', authenticate, instutionController.destroy)

module.exports = router
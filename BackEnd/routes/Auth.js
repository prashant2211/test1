const express       =   require('express')
const router        =   express.Router()


const AuthController    = require('../controller/AuthContrroller')
const authenticate       = require('../middleware/authenticate');

router.post('/register', authenticate, AuthController.register)
router.post('/login', AuthController.login)  //refresh-token
router.post('/refresh-token', AuthController.refreshToken)


module.exports = router
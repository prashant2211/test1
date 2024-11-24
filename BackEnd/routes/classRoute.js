const express       = require('express')
const router        = express.Router()

const ClassController = require('../controller/classController');
const authenticate       = require('../middleware/authenticate');

router.get('/', authenticate, ClassController.index)
router.get('/show', authenticate, ClassController.show)
router.post('/store', authenticate, ClassController.store)
router.patch('/update', authenticate, ClassController.update)
router.delete('/delete', authenticate, ClassController.destroy)

module.exports = router
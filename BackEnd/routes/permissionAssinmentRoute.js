const express       = require('express')
const router        = express.Router()

const permissionAssinment = require('../controller/permissionAssinment');
const authenticate       = require('../middleware/authenticate');

router.post('/create-permission', authenticate, permissionAssinment.createPermissionSet) //
router.get('/check-access', authenticate, permissionAssinment.permissionAccess)
router.get('/check-all-access', authenticate, permissionAssinment.getAllPermissions)
// router.post('/register-management', authenticate, managementController.store)
// router.patch('/update-management', authenticate, managementController.update)
// router.delete('/delete-management', authenticate, managementController.destroy)
module.exports = router
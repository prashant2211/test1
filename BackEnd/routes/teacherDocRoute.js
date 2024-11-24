const express = require('express');
const router = express.Router();
const teacherDocumentManager = require('../controller/teacherDocumentManager');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');


const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/upload_Teacher_Doc', authenticate, upload.single('UploadDocuments'), teacherDocumentManager.upload);


module.exports = router
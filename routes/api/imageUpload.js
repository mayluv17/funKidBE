const express = require('express');
const router = express.Router();
const imageUploadController = require('../../controllers/imageUploadController');



router.route('/upload')
    .post(imageUploadController.uploadData)


module.exports = router;
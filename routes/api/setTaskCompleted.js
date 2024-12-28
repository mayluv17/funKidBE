const express = require('express');
const router = express.Router();
const taskCompleteController = require('../../controllers/taskCompleteController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(taskCompleteController.setTaskCompleted);

module.exports = router;
const express = require('express');
const router = express.Router();
const taskDataController = require('../../controllers/taskDataController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(taskDataController.createNewData);

module.exports = router;
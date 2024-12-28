const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/:taskId')
    .get(tasksController.getSingleTask);

module.exports = router;

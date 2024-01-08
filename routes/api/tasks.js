const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/:categoryName')
    .get(tasksController.getAllTasksBycategory)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),tasksController.getAllTasks)

router.route('/modifyTask')
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),tasksController.updateTask)

    
router.route('/addtask')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),tasksController.addTask)

    router.route('/deleteTask')
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),tasksController.deleteTask)

module.exports = router;
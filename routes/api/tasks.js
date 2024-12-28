const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const [User, Editor, Admin] = ROLES_LIST;

router.route('/:categoryName').get(tasksController.getAllTasksBycategory);
// .post(verifyRoles(Editor, Admin), employeesController.createNewEmployee)
// .put(verifyRoles(Editor, Admin), employeesController.updateEmployee)
// .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/').get(verifyRoles(Editor, Admin), tasksController.getAllTasks);

router
  .route('/modifyTask')
  .put(verifyRoles(Editor, Admin), tasksController.updateTask);

router
  .route('/addtask')
  .post(verifyRoles(Editor, Admin), tasksController.addTask);

router
  .route('/deleteTask')
  .delete(verifyRoles(Editor, Admin), tasksController.deleteTask);

module.exports = router;

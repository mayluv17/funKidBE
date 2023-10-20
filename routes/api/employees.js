const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeesController");

router
  .route("/")
  //the middleware runs before the controller
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee);
router.route("/:1d").get(employeeController.getEmployee);
module.exports = router;

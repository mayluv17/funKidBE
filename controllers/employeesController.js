const data = {};
data.employee = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const createNewEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

const deleteEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

const updateEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  getEmployee,
  deleteEmployee,
};

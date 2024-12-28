const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userCompleted: {
    type: Array,
    required: false,
    default: []
  },
  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Tasks", tasksSchema);

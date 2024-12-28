const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskDataSchema = new Schema({
    taskId: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    userId: {
        type: String,
        required: true,
      },
  
  });
  
  module.exports = mongoose.model("taskData", taskDataSchema);
  
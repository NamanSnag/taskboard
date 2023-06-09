const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

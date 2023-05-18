const Task = require('../models/Task');
const List = require('../models/List');

// Create a new task
const createTask = async (req, res, next) => {
    const { title, listId } = req.body;
  
    try {
      const newTask = await Task.create({ title, listId });
      const list = await List.findById({_id: listId});
      list.taskOrder.push(newTask);
      list.save();
  
      return res.status(200).json({
        details: newTask,
        msg: 'Task created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  const getTask = async (req, res, next) => {
    try {
      const { listId } = req.params;
  
      // Fetch all lists for the specified user
      const tasks = await Task.find({ listId});
  
      res.json({
        details: tasks,
        msg: "task fetched"
      });
    } catch (error) {
     next(error);
    }
}


  // update task
  const updateTask = async (req, res, next) => {
    const { taskId } = req.params;
    const { title, completed } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { title, completed },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      return res.json(task);
    } catch (error) {
      next(error);
    }
  };
  

  module.exports = {
    createTask,
    updateTask,
    getTask
  }
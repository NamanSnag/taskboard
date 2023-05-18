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
    const { title, completed, listId } = req.body;
  
    try {
      // Find the list and update the task order
      const list = await List.findById(listId);
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
  
      const taskIndex = list.taskOrder.findIndex(task => task._id.toString() === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found in the list' });
      }
  
      list.taskOrder[taskIndex].completed = completed;
      const updatedTaskOrder = list.taskOrder.toObject(); // Convert taskOrder to plain JavaScript array
  
      // Update the task order in the database
      await List.findByIdAndUpdate(listId, { taskOrder: updatedTaskOrder });
  
      // Update the task
      const task = await Task.findByIdAndUpdate(
        taskId,
        { title, completed },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      return res.status(200).json({
        msg: 'Task updated successfully',
        details: updatedTaskOrder
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
  
    try {
      // Find the task and get the associated list ID
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      const listId = task.listId;
  
      // Delete the task from the Task collection
      await Task.findByIdAndDelete(taskId);
  
      // Remove the task ID from the taskOrder array in the List collection
      const list = await List.findById(listId);
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
  
      list.taskOrder = list.taskOrder.filter(task => task._id.toString() !== taskId);
      const updatedOrder = list.taskOrder.toObject();
      await List.findByIdAndUpdate(listId, { taskOrder: updatedOrder });
  
      return res.status(200).json({ msg: 'Task deleted successfully', details: updatedOrder });
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createTask,
    updateTask,
    getTask,
    deleteTask
  }
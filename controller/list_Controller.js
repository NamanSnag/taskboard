const List = require("../models/List");
const Task = require("../models/Task");

const createList = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { id } = req.user;

    const newList = await List.create({ 
        title,
        userId: id,
     });

    return res.status(200).json({
        details: newList,
        msg: "Successfully created a list"
    });
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
    try {
      const { id } = req.user;
  
      // Fetch all lists for the specified user
      const lists = await List.find({ userId: id });
  
      res.json(lists);
    } catch (error) {
     next(error);
    }
}

// Update a list
const updateTaskOrder = async (req, res, next) => {
  try {
    const { sourceListId, destinationListId, sourceOrder, destinationOrder } = req.body;
    
    // Update the source list's task order
    const source = await List.findById({_id : sourceListId});
    if(sourceOrder !== source.taskOrder) {
      source.taskOrder = sourceOrder;
      await source.save();
    }

    // Update the destination list's task order
    const dest = await List.findById(destinationListId);
    if(destinationOrder !== dest.taskOrder) {
      dest.taskOrder = destinationOrder;
      await dest.save();
    }

    return res.status(200).json({ success: true, message: "Task order updated successfully" });
  } catch (error) {
    next(error);
  }
};

  // Delete a list
const deleteList = async (req, res, next) => {
    const { listId } = req.params;
  
    try {
      const list = await List.findOneAndDelete({ _id: listId });
      const task = await Task.deleteMany({listId})
      if (!list) {
        return res.status(404).json({ error: 'List not found' });
      }
  
      return res.json({ message: 'List deleted successfully' });
    } catch (error) {
     next(error);
    }
  };

module.exports = {
    createList,
    deleteList,
    getList,
    updateTaskOrder
}
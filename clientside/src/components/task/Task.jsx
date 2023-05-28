import React, { useState } from "react";

import "./style.scss";
import { Draggable } from "react-beautiful-dnd";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

const Task = ({ task, index, list, setList }) => {
  const [checked, setChecked] = useState(task.completed);

  const handleCheck = async (e) => {
    e.preventDefault();
    const newChecked = !checked;
    setChecked(newChecked);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`/task/update/${task._id}`, {
        token,
        title: task.title,
        completed: newChecked,
        listId: task.listId,
      });
      let order = res.data.details;
      let index = list.findIndex((item) => item._id === task.listId);
      list[index].taskOrder = order;
      setList([...list]);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`/task/delete/${task._id}`, {
        token,
      });
      let order = res.data.details;
      let index = list.findIndex((item) => item._id === task.listId);
      list[index].taskOrder = order;
      setList([...list]);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task__list">
            {task.completed ? (
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCheck}
              />
            ) : (
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCheck}
              />
            )}
            <div className="list__title">{task.title}</div>
          </div>
          {task.completed && (
            <div className="task__delete" onClick={handleDeleteTask}>
              <BsFillTrashFill className="task__del" />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;

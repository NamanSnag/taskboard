import React, { useRef } from "react";
import Task from "../task/Task";
import axios from "axios";
import { Droppable } from "react-beautiful-dnd";
import { RxCross1 } from "react-icons/rx";

import "./style.scss";

const List = ({ list, setList, li }) => {
  const taskt = useRef();

  const handleAddTask = async (e) => {
    e.preventDefault();
    let title = taskt.current.value;
    let listId = list._id;
    const token = localStorage.getItem("token");
    const response = await axios.post("/task/create", {
      token,
      title,
      listId,
    });
    const newTask = response.data.details;

    let index = li.findIndex((li) => li._id === list._id);
    li[index].taskOrder.push(newTask);
    setList([...li]);

    // Clear the input field
    taskt.current.value = "";
  };

  const handleDeleteList = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(`/list/delete/${list._id}`, {
      token,
    });
    li = li.filter((li) => li._id !== list._id);
    setList(li);
  };


  return (
    <div className="list">
      <div className="list__head">
        <p>{list.title}</p>
      </div>
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list__body"
          >
            {list.taskOrder.map((task, index) => (
              <Task key={task._id} list={li} setList={setList} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="list__delete" onClick={handleDeleteList}>
        <RxCross1 className="cross" />
      </div>

      <div className="list__addTask">
        <form onSubmit={handleAddTask}>
          <input type="text" ref={taskt} placeholder="Enter task" />
          <button>ADD Task</button>
        </form>
      </div>
    </div>
  );
};

export default List;

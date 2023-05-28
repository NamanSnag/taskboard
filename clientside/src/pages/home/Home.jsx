import React, { useEffect, useState, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import "./style.scss";
import { List } from "../../components";
import axios from "axios";

const Home = () => {

  const [list, setList] = useState([]);

  const title = useRef();
  
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/list/all", {token});
      setList(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const createList = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/list/create", { title, token });
      setList([...list, response.data.details]);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    let t = title.current.value;
    if(t.length > 0) {
      createList(t);
    }
    title.current.value = "";
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;
  
    // If there's no valid destination, return
    if (!destination) return;
  
    // If the draggable item was dropped back to its original position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // Get the source and destination list IDs
    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;
  
    // Find the source and destination lists in the list state
    const sourceListIndex = list.findIndex((list) => list._id === sourceListId);
    const destinationListIndex = list.findIndex(
      (list) => list._id === destinationListId
    );
  
    // Get the source and destination lists
    const sourceList = list[sourceListIndex];
    const destinationList = list[destinationListIndex];
  
    const sourceOrder = sourceList.taskOrder;
    const destinationOrder = destinationList.taskOrder;
  
    // Move the task from the source list to the destination list
    const taskToMove = sourceList.taskOrder.splice(source.index, 1)[0];
    taskToMove.listId = destinationListId; // Update the listId of the moved task
    destinationList.taskOrder.splice(destination.index, 0, taskToMove);
  
    const taskId = taskToMove._id;

    // Update the list state with the modified lists
    setList([...list]);
  
    // Make an API call to update the task order in the backend
    try {
      const token = localStorage.getItem("token");
      await axios.post("/list/updateTaskOrder", {
        token,
        sourceListId,
        destinationListId,
        sourceOrder,
        destinationOrder,
        taskId
      });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
   <div className="home">
      <div className="home__container">
        <div className="home__lists">
          {list.length ? (
            list.map((lis) => (
            <List
             key={lis._id} list={lis} setList={setList} li={list}/>
          ))):(
            <h1>Add New List</h1>
          )
          }
        </div>
        <div className="home__createl">
        <form onSubmit={handleCreateList}>
        <input
            type="text"
            placeholder="Enter list title"
            ref={title}
          />
          <button>Create New List</button>
        </form>
        </div>
      </div>
    </div>
    </DragDropContext>
  );
};


export default Home;

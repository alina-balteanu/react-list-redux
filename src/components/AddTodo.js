import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../thunks/thunks";


export const AddTodo = () => {
  let dispatch = useDispatch()
  const [newTitle, setTitle] = useState();

  return (
    <form style={{ display: "flex" }}>
      <span onClick={() => {
        const addTodoThunk = addTodo({
          id: new Date(),
          title: newTitle,
          completed: false
        })
        dispatch(addTodoThunk)
        setTitle("");
      }} className="add-btn">
        <i className="fas fa-plus" />
      </span>
      <input
        className="add-todo"
        type="text"
        name="title"
        placeholder="Add item"
        style={{ flex: "10", padding: "5px" }}
        value={newTitle || ""}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />
    </form>
  );
}


export default AddTodo;

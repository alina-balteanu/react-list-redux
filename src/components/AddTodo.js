import React, { useState } from "react";
import PropTypes from "prop-types";

export const AddTodo = (props) => {

  const [newTitle, setTitle] = useState({
    title: ""
  });

  const onChange = e => {
    //user types in
    setTitle({
      [e.target.name]: e.target.value
    });
  };

  const onDoneReset = e => {
    if (newTitle.title) {
      props.addTodo(newTitle.title);
      //reset add item field, so you can type again
    }
    setTitle({
      title: ""
    });
  };

  return (
    <form style={{ display: "flex" }}>
      <span onClick={onDoneReset} className="add-btn">
        <i className="fas fa-plus" />
      </span>
      <input
        className="add-todo"
        type="text"
        name="title"
        placeholder="Add item"
        style={{ flex: "10", padding: "5px" }}
        value={newTitle.title}
        onChange={onChange}
        autoComplete="off"
      />
    </form>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, markTodo, updateTodo } from "../thunks/thunks";

const TodoItem = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [isDisabled, setDisabled] = useState(false);
  let dispatch = useDispatch()
  const getStyle = () => {
    return {
      textDecoration: todo.completed ? "line-through" : "none",
      color: todo.completed ? "#7a7a7a" : "#000"
    };
  };
  return (
    <div className="item-wrapper">
      <div className="inner-wrapper">
        <div className="to-do-item">
          <div
            className="toggle-check"

            onClick={() => {
              const markTodoThunk = markTodo({
                ...todo,
                completed: !todo.completed
              })
              dispatch(markTodoThunk)
            }
            }
          >
            <div
              className={"line1 line" + (todo.completed ? " trans-line1" : "")}
            />
            <div
              className={"line2 line" + (todo.completed ? " trans-line2" : "")}
            />
          </div>
          <textarea
            rows="1"
            className="item-content"
            value={title}
            style={getStyle()}
            spellCheck="false"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              const updateTodoThunk = updateTodo({
                ...todo,
                title: title
              })
              dispatch(updateTodoThunk)
            }}
          />
        </div>

        <button
          className="del-btn"
          disabled={isDisabled}
          onClick={() => {
            const deleteTodoThunk = deleteTodo(todo.id)
            dispatch(deleteTodoThunk)
            setDisabled(true)
          }}
        >
          <i className="fas fa-trash-alt " />
        </button>
      </div>
    </div>
  );
}


export default TodoItem;

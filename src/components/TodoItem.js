import React, { useRef } from "react";
import PropTypes from "prop-types";

const TodoItem = (props) => {
  const getStyle = () => {
    return {
      textDecoration: props.todo.completed ? "line-through" : "none",
      color: props.todo.completed ? "#7a7a7a" : "#000"
    };
  };
  const btnEl = useRef(null);

  const { id, title, completed } = props.todo;
  return (
    <div className="item-wrapper">
      <div className="inner-wrapper">
        <div className="to-do-item">
          <div
            className="toggle-check"
            onClick={() => { props.markComplete(id) }}
          >
            <div
              className={"line1 line" + (completed ? " trans-line1" : "")}
            />
            <div
              className={"line2 line" + (completed ? " trans-line2" : "")}
            />
          </div>
          <textarea
            rows="1"
            className="item-content"
            value={title}
            style={getStyle()}
            spellCheck="false"
            onChange={(e) => { props.editText(id, e) }}
            onBlur={() => { props.saveText(id) }}
          />
        </div>

        <button
          className="del-btn"
          onClick={() => { props.delTodo(id, btnEl) }}
          ref={btnEl}
        >
          <i className="fas fa-trash-alt " />
        </button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;

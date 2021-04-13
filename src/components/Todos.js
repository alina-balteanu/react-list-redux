import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";


const Todos = () => {
  const todos = useSelector(state => state)
  return todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
    />
  ));
}


export default Todos;

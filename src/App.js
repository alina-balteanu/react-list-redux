
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";

import "./App.scss";
import axios from "axios";

const App = () => {
  const [todosState, setTodos] = useState({
    todos: []
  })

  //component did update 
  const ref = useRef(false);
  useEffect(() => {
    //slower transition for new item
    if (ref.current) {
      let todos = Array.from(document.querySelectorAll(".item-wrapper"));
      let lastEl = todos[todosState.todos.length - 1];
      if (lastEl && todosState.todos.length !== 0) {
        lastEl.style.transitionDelay = 0 + "s";
        lastEl.style.transitionDuration = 3 + "s";
      }
    } else {
      ref.current = true;
    }
  }, [todosState.todos]);

  //component did mount
  useEffect(() => {
    axios
      .get("https://6072cef1e4e0160017ddeebf.mockapi.io/todo")
      .then((res) => setTodos({ todos: res.data })).catch((err) => {
        console.log(err)
      });
  }, [])


  //toggle complete
  const markComplete = (id) => {
    const stateCopy = [...todosState.todos];
    setTodos({
      todos: stateCopy.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          axios.put(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${id}`, {
            completed: todo.completed
          });
        }
        return todo;
      })
    });
  };

  //update text in state when user  types in
  const editText = (id, e) => {
    const stateCopy = [...todosState.todos];
    setTodos({
      todos: stateCopy.map(todo => {
        if (todo.id === id) {
          todo.title = e.target.value;
        }
        return todo;
      })
    });
  };

  //save user edited text when user clicks outside the item row
  const saveText = (id) => {
    const stateCopy = [...todosState.todos];
    setTodos({
      todos: stateCopy.map(todo => {
        if (todo.id === id) {
          axios.put(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${id}`, {
            title: todo.title
          });
        }
        return todo;
      })
    });
  };

  //delete todo
  const delTodo = (id, btnRef) => {

    //make sure you don't call delete several time on the same button
    if (btnRef.current.getAttribute("disabled")) {
      return;
    }
    btnRef.current.setAttribute("disabled", "disabled")

    const stateCopy = [...todosState.todos];
    axios.delete(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${id}`).then(res =>
      setTodos({
        todos: [...stateCopy.filter(todo => todo.id !== id)]
      })
    ).catch((err) => {
      console.log(err)
    });
  };

  //create new todo
  const addTodo = title => {
    axios
      .post("https://6072cef1e4e0160017ddeebf.mockapi.io/todo", {
        title,
        completed: false,
        id: new Date()
      })
      .then(res => {
        const stateCopy = [...todosState.todos];
        setTodos({
          todos: [...stateCopy, res.data]
        })
      }).catch((err) => {
        console.log(err)
      });

  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddTodo addTodo={addTodo} />

                <div className="todos-wrapper">
                  <Todos
                    todos={todosState.todos}
                    markComplete={markComplete}
                    delTodo={delTodo}
                    editText={editText}
                    saveText={saveText}
                  />
                </div>
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;

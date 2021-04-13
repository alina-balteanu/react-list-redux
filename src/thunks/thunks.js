import axios from "axios";

//get todos on first load
export async function fetchTodos(dispatch, getState) {
    const stateBefore = getState();
    console.log('Todos before dispatch: ', stateBefore)
    let response;
    await axios
        .get("https://6072cef1e4e0160017ddeebf.mockapi.io/todo")
        .then((res) => { response = res.data; }).catch((err) => {
            console.log(err)
        });
    dispatch({ type: 'LOAD_TODO', payload: response })
    const stateAfter = getState()
    console.log('Todos after dispatch: ', stateAfter)
}

export function deleteTodo(id) {
    return async function deleteTodoThunk(dispatch) {
        let response;
        await axios.delete(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${id}`).then(res => {
            response = res.data;
        }).catch((err) => {
            console.log(err)
        });
        dispatch({ type: 'DELETE_TODO', payload: response })
    }
}

export function markTodo(todo) {
    return async function markTodoThunk(dispatch) {
        let response;
        await axios.put(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${todo.id}`, todo).then(res => {
            response = res.data;
        });
        dispatch({ type: 'MARK_TODO', payload: response })
    }
}

export function updateTodo(todo) {
    return async function updateTodoThunk(dispatch) {
        let response;
        await axios.put(`https://6072cef1e4e0160017ddeebf.mockapi.io/todo/${todo.id}`, todo).then(res => {
            response = res.data;
        });
        dispatch({ type: 'UPDATE_TODO', payload: response })
    }
}

export function addTodo(todo) {
    return async function addTodoThunk(dispatch) {
        let response;
        await axios
            .post("https://6072cef1e4e0160017ddeebf.mockapi.io/todo", todo)
            .then(res => {
                response = res.data
            }).catch((err) => {
                console.log(err)
            });

        dispatch({ type: 'ADD_TODO', payload: response })
    }
}


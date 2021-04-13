const initialState = [];
export let reducer = (state = initialState, action) => {
    let newTodos;
    switch (action.type) {
        case 'LOAD_TODO': {
            return action.payload
        }
        case 'ADD_TODO':
            return [...state, action.payload]
        case 'DELETE_TODO':
            newTodos = [...state];
            return newTodos.filter(todo => todo.id !== action.payload.id);
        case 'MARK_TODO':
            newTodos = [...state];
            return newTodos.map((el) => {
                if (el.id !== action.payload.id) {
                    return el;
                }
                return {
                    ...el,
                    ...action.payload
                }
            })
        case 'UPDATE_TODO':
            newTodos = [...state];
            return newTodos.map((el) => {
                if (el.id !== action.payload.id) {
                    return el;
                }
                return {
                    ...el,
                    ...action.payload
                }
            })
        default:
            return state;
    }
}
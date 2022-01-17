import { 
    createTodo, removeTodo, completeTodo,
    loadTodosInProgress, loadTodosSuccess, loadTodosFailure 
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch (err) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(err));
    }
};

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: { 
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (err) {
        dispatch(displayAlert(err));
    }
};

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (err) {
        dispatch(displayAlert(err));
    }
}

export const completeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const completedTodo = await response.json();
        dispatch(completeTodo(completedTodo));
    } catch (err) {
        dispatch(displayAlert(err));
    }
}

export const displayAlert = text => () => {
    alert(text);
};
export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = text => ({
    type: CREATE_TODO,
    payload: { text },
});

export const RENICE_TODO = 'RENICE_TODO';
export const removeTodo = text => ({
    type: REMOVE_TODO,
    payload: { text },
});
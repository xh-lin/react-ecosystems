import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { getTodos, getTodosLoading } from './selectors'
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';
import './TodoList.css';

const TodoList = ({ todos = [], isLoading, onRemovePressed, onCompletedPressed, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed} />)}
        </div>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProp = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state),
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(completeTodoRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
})

export default connect(mapStateToProp, mapDispatchToProps)(TodoList);
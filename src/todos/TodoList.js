import React from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { removeTodo } from './actions';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} />)}
    </div>
);

const mapStateToProp = state => ({
    todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
})

export default connect(mapStateToProp, mapDispatchToProps)(TodoList);
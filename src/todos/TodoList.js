import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { getTodosLoading, getIncompleteTodos, getCompletedTodos } from './selectors'
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ 
    isLoading, completedTodos, incompleteTodos,
    onRemovePressed, onCompletedPressed, 
    startLoadingTodos,
}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed} />)}
            <h3>Completed:</h3>
            {completedTodos.map(todo => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed} />)}
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProp = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(completeTodoRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
})

export default connect(mapStateToProp, mapDispatchToProps)(TodoList);
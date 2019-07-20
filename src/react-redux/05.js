// Redux: Adding React Router to the Project

import { createStore, combineReducers } from 'redux'
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { loadState, saveState } from './localStorage'
import { v4 } from 'node-uuid'
import throttle from 'lodash/throttle';
import { BrowserRouter as Router, Route } from "react-router-dom"

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const Link = ({
    active,
    children,
    onClick
    }) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="#" onClick={e => {
            e.preventDefault();
            onClick();
        }}>{children}</a>
    )
};

const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
});

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                    t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                    t => !t.completed
            );
    }
}

const Todo = ({
    onClick,
    completed,
    text
    }) => (
    <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
    }) => (
    <ul>
        {todos.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onTodoClick(todo.id)}
                    />
        )}
    </ul>
);

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={node => {
                    input = node;
                 }} />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
}
AddTodo = connect()(AddTodo);

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL'>All</FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
)

const mapStateToTodoListProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id));
    }
});

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);


const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

const persistedState = loadState();

const store = createStore(todoApp, persistedState);

store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
}, 1000));


const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path='/' component = { TodoApp } />
        </Router>
    </Provider>
);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)


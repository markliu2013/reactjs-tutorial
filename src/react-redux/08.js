// Redux: Using withRouter() to Inject the Params into Connected Components

import { createStore, combineReducers } from 'redux'
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { loadState, saveState } from './localStorage'
import { v4 } from 'node-uuid'
import throttle from 'lodash/throttle';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";

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

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const FilterLink = ({filter, children}) => (
    <NavLink
        to={ filter === 'all' ? '/' : '/'+filter }
        activeStyle={{
            textDecoration: 'none',
            color: 'black'
        }}
        >
        {children}
    </NavLink>
);

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(
                    t => t.completed
            );
        case 'active':
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
        <FilterLink filter='all'>All</FilterLink>
        {' '}
        <FilterLink filter='active'>Active</FilterLink>
        {' '}
        <FilterLink filter='completed'>Completed</FilterLink>
    </p>
)

const mapStateToTodoListProps = (state, { match }) => ({
    todos: getVisibleTodos(state.todos, match.params.filter || 'all')
});

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id));
    }
});

const VisibleTodoList = withRouter(connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList));


const TodoApp = ({ match }) => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
}

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
            <Route path='/:filter?' component = { TodoApp } />
        </Router>
    </Provider>
);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)


// Redux: React Counter Example

import { createStore } from 'redux'
import React from 'react';
import ReactDOM from 'react-dom';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREAMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const store = createStore(counter);
//console.log(store.getState());
//store.dispatch({ type: 'INCREAMENT' });
//console.log(store.getState());
const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={()=>
                store.dispatch({ type: 'INCREAMENT' })
            }
            onDecrement={()=>
                store.dispatch({ type: 'DECREMENT' })
            }
        />,
        document.getElementById('root')
    )
}
store.subscribe(render);
render();



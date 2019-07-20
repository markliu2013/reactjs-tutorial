// Redux: Implementing Store from Scratch

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

// 闭包,所有state一直存在.
const createStore = (reducer) => {
    var state;
    var listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        // 实现unsubscribe
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };
    dispatch({});
    return {getState, dispatch, subscribe};
}

const store = createStore(counter);
//console.log(store.getState());
//store.dispatch({ type: 'INCREAMENT' });
//console.log(store.getState());
const render = () => {
    document.getElementById('root').innerHTML = store.getState();
}
const unsubscribe = store.subscribe(render);
render();

// unsubscribe()

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREAMENT' });
});




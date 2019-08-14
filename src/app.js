import React from 'react';
import ReactDOM from "react-dom";

import { useState, useEffect, useRef } from "react";

function Question2() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter(counter + 1);
        }, 1000);
    }, []);

    return (
        <div>
            { counter }
        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function Counter() {
    let [count, setCount] = useState(0);

    useInterval(() => {
        // Your custom logic here
        setCount(count + 1);
    }, 1000);

    return (<h1>{count}</h1>);
}

ReactDOM.render(
    <Counter />,
    document.getElementById('root')
)


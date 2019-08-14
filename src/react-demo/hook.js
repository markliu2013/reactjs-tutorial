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

// https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function Question2Fix() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter(prevCounter => prevCounter + 1); // <-- Change this line!
        }, 1000);
    }, []);

    return (
        <div>
            { counter }
        </div>
    );
}

ReactDOM.render(
    <Question2 />,
    document.getElementById('root')
)


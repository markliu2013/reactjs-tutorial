// https://reactjs.org/docs/state-and-lifecycle.html

import React from 'react';
import ReactDOM from 'react-dom';

// The problem with this syntax is that a different callback is created each time the
// Component renders.In most cases, this is fine. However, if this callback is passed as a prop to lower components,
// those components might do an extra re-rendering.
function Question1() {
    return (
        <button onClick={(e) => alert('Say hello!')}>
            Test
        </button>
    );
}

class Question1Fix extends React.Component {

    handleClick = () => {
        console.log(this);
        alert('Say hello!');
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Test
            </button>
        );
    }
}

ReactDOM.render(
    <Question1Fix />,
    document.getElementById('root')
);
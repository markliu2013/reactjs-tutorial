import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css'

class Board extends React.Component {
    render() {
        return (
            <h1>Hello, world!</h1>
        )
    }
    shouldComponentUpdate() {

    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);

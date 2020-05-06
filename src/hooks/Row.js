import React from 'react';
import ReactDOM from "react-dom";

export default function Row(props) {
    return (
        <div>
            <label>{ props.label }</label>
            <br/>
            { props.children }
        </div>
    )
}

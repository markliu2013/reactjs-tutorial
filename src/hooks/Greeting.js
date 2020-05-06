import React from 'react';
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import Row from './Row';

export default function Greeting(props) {
    const [name, setName] = useState('Mary');
    const [surname, setSurname] = useState('Poppins');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
    }

    useEffect(() => {
        document.title = name + ' ' + surname;
    });

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });


    return (
        <section>
            <Row label="Name">
                <input
                    value = { name }
                    onChange = { handleNameChange }
                />
            </Row>
            <Row label="Surname">
                <input
                    value = { surname }
                    onChange = { handleSurnameChange }
                    />
            </Row>
            <Row label="Width">
                <label>{ width }</label>
            </Row>
        </section>
    )
}

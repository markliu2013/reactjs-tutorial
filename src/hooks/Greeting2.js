import React from 'react';
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import Row from './Row';

export default function Greeting2(props) {

    const name = useFormInput('Mary');
    const surname = useFormInput('Poppins');
    useDocumentTitle(name.value, surname.value);
    const width = useWindowWidth();

    return (
        <section>
            <Row label="Name">
                <input {...name} />
            </Row>
            <Row label="Surname">
                <input {...surname} />
            </Row>
            <Row label="Width">
                <label>{ width }</label>
            </Row>
        </section>
    )
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    };
}

function useDocumentTitle(name, surname) {
    useEffect(() => {
        document.title = name + ' ' + surname;
    });
}

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    return width;
}
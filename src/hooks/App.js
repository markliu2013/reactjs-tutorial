// https://segmentfault.com/a/1190000020108840

import React from 'react';
import { useState, useEffect, useCallback } from "react";

// 用于记录 getData 调用次数
let count = 0;

export default function App() {
    const [val, setVal] = useState("");

    const getData = useCallback(() => {
        console.log(val);
        setTimeout(() => {
            setVal("new data " + count);
            count++;
        }, 500);
    }, [val]);

    return <Child val={val} getData={getData} />;
}

function Child({val, getData}) {
    useEffect(() => {
        getData();
    }, [getData]);

    return <div>{val}</div>;
}
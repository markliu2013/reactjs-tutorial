function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Record {
    performLongRunningAction() {
        let sleepMilliseconds = getRandomInt(1, 5) * 1000;
        return new Promise(resolve => setTimeout(()=> {
            console.log("record performLongRunningAction resolved in " + sleepMilliseconds + " milliseconds");
            resolve("record resolve data" + new Date().getTime())
        }, sleepMilliseconds));
    }
}

function fetchOneMillionRecords() {
    return new Promise(resolve => setTimeout(()=> {
        let records = Array(25).fill().map(function () { return new Record() });
        console.log("fetchOneMillionRecords resolved");
        resolve(records)
    }, 2000));
}

/*
async function Question3() {
    const records = await fetchOneMillionRecords();

    const results = records.map(record => {
        await record.performLongRunningAction();
    });

    return results;
}
*/

// https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
// https://jakearchibald.com/2017/await-vs-return-vs-return-await/
// https://segmentfault.com/a/1190000007535316
// https://www.jianshu.com/p/73b070eebf50
// Synchronous loop
async function Question3Synchronous() {
    const records = await fetchOneMillionRecords();
    let results = [];
    for (const record of records) {
        let recordResolveData = await record.performLongRunningAction();
        results.push(recordResolveData);
    }
    return results;
}


// Process array in parallel
async function Question3Parallel() {
    const records = await fetchOneMillionRecords();
    const results = records.map(async record => {
        return await record.performLongRunningAction();
    });
    // results is promise array
    return await Promise.all(results);
}

// result is a promise
const result = Question3Synchronous();
result.then(v=>{
    console.log(v);
});



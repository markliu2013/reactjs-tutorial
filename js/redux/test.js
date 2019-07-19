var CASE_FIZZ = 3;
var CASE_BUZZ = 5;
for (var i = 1; i < 101; i++) {
    if (i % (CASE_FIZZ * CASE_BUZZ) == 0) {
        console.log('FizzBuzz');
    } else if (i % CASE_FIZZ == 0) {
        console.log('Fizz');
    } else if (i % CASE_BUZZ == 0) {
        console.log('Buzz');
    } else {
        console.log(i);
    }
}
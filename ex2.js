//Added comment for git
var readlineSync = require('readline-sync');
 
function sum10() {

    // Get the numbers from the user
    var num1 = readlineSync.question('Please enter the first number: ');
    var num2 = readlineSync.question('please enter the second number: ');

    // Check that the sum of the numbers equals 10
    if ( Number(num1) + Number(num2)  == 10 ) {
        console.log('makes 10');
    }
    else {
        console.log('nope');
    }
}

sum10();
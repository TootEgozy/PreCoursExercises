var readlineSync = require('readline-sync');

var num = readlineSync.question("Please enter a positive integer: ");
var factorial=1;

if (!Number.isNaN(num) && Number.isInteger(Number(num)) && Number(num) > 0 ) {
    for (var i=2; i<=num; i++) factorial *= i;
    console.log("The factorial of "+num+" is "+factorial);
}
else
{
    console.log("Wrong input. Please enter a POSITIVE INTEGER.");
}
var readlineSync = require('readline-sync');

//Ask the user for the first time to enter a number
var num = readlineSync.question("Please enter an integer larger than 10: ");

//Function for checking if input is an integer number
function checkNum(num) {
    if ( Number.isNaN(num) || !Number.isInteger(num) ) {
        return false;
    }
}
 
//Repeat until the user enter a number in the requested range
while (num <= 10 || checkNum(num) == false) {  
    num = readlineSync.question("Wrong input. Please enter an INTEGER LARGER than 10: ");   
}
 
console.log("Thank you!");

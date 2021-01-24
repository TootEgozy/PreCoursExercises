var readlineSync = require("readline-sync");

//Maximum and minimum limits for the number generator, as instructed.
//An empty array to be filled with random values.
const max = 50, min = 1;
var arr = [];

//Check input validity: the loop will continue to ask for input until it's a positive integer.
var length = 0;
while (Number.isNaN(length) || !Number.isInteger(Number(length)) || length <= 0 ) {
     length = readlineSync.question("Please enter a positive integer: ");
}

//Fill an array with random values between 1-50. The length of the array "length" was chosen by the user.
for (var i=0; i<length; i++) {
    var item = Math.floor(Math.random() * (max - min + 1) ) + min;
    arr.push(item);
} 

//Loop over the array and find minimum and maximum values.
var maxNum=arr[0], minNum=arr[0];
for (var i=1; i<length; i++) {
    if (arr[i] > maxNum) maxNum = arr[i];
    if (arr[i] < minNum) minNum = arr[i];
}

console.log("These are the numbers generated:");
console.log(arr);
console.log("The largest number is: " + maxNum);
console.log("The smallest number is: " + minNum);
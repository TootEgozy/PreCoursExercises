//Reverse an arry with reverse() method.
//I chose to use reverse() from Javascript library because the exercise does not explicitly request us to manually implement reverse.
//reverse() fulfills the requirement of the exercise by performing a reverse in place, so our function modifies its argument.
//If required, I will implement reverse via loop and resubmit.
//Receives: an array 
//Returns: nothing
function reverseArray (array) {
    array.reverse();
}
var myArr = [7, 2, 22, 10, 8, 63];

console.log("Original array:");
console.log(myArr);
reverseArray(myArr);
console.log("Array after reverse:");
console.log(myArr);
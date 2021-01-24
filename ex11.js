var readlineSync = require("readline-sync");

//A function that reverses a string
function reverseString(str) {
    return str.split("").reverse().join("");
}

//Get a string from the user
var str = readlineSync.question("Please enter a string:\n",);

if (str == "") console.log("Please enter a valid string!");
else {
    reversedStr = reverseString(str);

    //Check if the received string is a palindrome by comparing it to its reverse
    if (str === reversedStr) console.log("The string "+str+" is a palindrome!");
    
    else console.log("Your string is not a palindrome: " + str + " != " + reversedStr);
}


/*
1. get a string from the user
2. split the string into an array
3. make a loop that runs from char in place 0 to char in place n, check if char is (a,e,i,o,u) and if so upplies a function
4. write a function for uppercase
5. join and return string
*/

var readlineSync = require("readline-sync");

//Get a string from the user
var str = readlineSync.question("Please enter a string:\n");

//Check if the string has lower case vowls (a, e, i, o, u):
//Receives: char - one of the characters in a string
//Returns: true if the character is an English alphabet vowel
//         false if the character is not a vowel 
function checkChar(char) {
    return (char == 'a' || char == 'e' || char == 'i' || char == 'o' || char == 'u');
}

// Returns an upper-case of the char only if it's a lowercase English vowel
// Receives: char
// Returns: char in uppercase if it's a vowel, otherwise returns the same char
function filterChar(char) {
    if (checkChar(char)) return char.toUpperCase();
    else return char;  
}

var result = "";

//Assemble the result string using filterChar
for (var i=0; i<str.length; i++) result += filterChar(str.charAt(i));

console.log("Processed string:");
console.log(result);



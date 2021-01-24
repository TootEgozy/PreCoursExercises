var readlineSync = require("readline-sync");

//Checks the validity of a word in an array
//Receives: a word from the array
//Returns: true if the word only contains English alphabetic characters
function valid(word) {
    const regex = RegExp('^[a-zA-Z]+$','g');
    return regex.test(word);
}

//Get a string from the user
var str = readlineSync.question("Please enter a string:\n",);

//Split the string into an array of words, using white spaces, punctuation marks, parenthesis etc as delimiters
var arr = str.split(/[\s.,!;:()\\-]/g);

//initialize the longest word as the first word in the array
var maxWord = "";

//scan the word array to find the longest word
for (var i = 0; i < arr.length; i++) {
    if ( valid(arr[i]) && arr[i].length > maxWord.length) maxWord = arr[i];
}

if (maxWord == "")
    console.log("There are no valid words in this input!");
else
    console.log("Longest word: "+maxWord);
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
var maxWords = [''];

//scan the word array to find the longest word 
for (var i = 0; i < arr.length; i++) {
    if (valid(arr[i])) {
        if (arr[i].length > maxWords[0].length) maxWords = [arr[i]];
        else if (arr[i].length == maxWords[0].length) maxWords.push(arr[i]);
    }
}

if (maxWords == []) console.log("There are no valid words in this input!");
else {
    var result = maxWords[0];
    for (var i=1; i<maxWords.length; i++) result += ", " + maxWords[i];
    console.log("Longest word(s): "+result);
}

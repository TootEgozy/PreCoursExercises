var readlineSync = require("readline-sync");

//Get a string from the user
var str = readlineSync.question("Please enter a string:\n",{keepWhitespace:true});

//Replace " " with "*" and print the result
console.log("The same string with spaces replaced by asterisks:")
console.log("\n"+str.replace(/ /g,"*"));


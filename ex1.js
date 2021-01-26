var readlineSync = require('readline-sync');
 
// Get the user's name
// Hello world!
var userName = readlineSync.question('Please enter your name: ');
console.log('Hello ' + userName + '!');
var readlineSync = require('readline-sync');
 
// Get the user's name
var userName = readlineSync.question('Please enter your name: ');
console.log('Hello ' + userName + '!');
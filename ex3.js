var readlineSync = require('readline-sync');

 //input a number from user
 var num = readlineSync.question("Please enter a number between 0-9: ");

//decide on output based on the value entered
switch(num) {
    case "0":
        console.log("ZERO");
        break;
    case "1":
        console.log("ONE");
        break;
    case "2":
        console.log("TWO");
        break;
    case "3":
        console.log("THREE");
        break;
    case "4":
        console.log("FOUR");
        break;
    case "5":
        console.log("FIVE");
        break;
    case "6":
        console.log("SIX");
        break;
    case "7":
        console.log("SEVEN");
        break;
    case "8":
        console.log("EIGHT");
        break;
    case "9":
        console.log("NINE");
        break;
    // for any other input
    default:
        console.log("You must enter a number between 0-9!");
        break;
}

var readlineSync = require('readline-sync');

var num = readlineSync.question("Welcome to the Restaurant Recommender! \n How many people are you going with? ");
//Check if we got a valid number, exit if not
try {
    if (num == "" ) throw "No value received";
    if (isNaN(num)) throw "Not a number";
    if (Number(num) < 0) throw "Negative number";
    if (!Number.isInteger(Number(num))) throw "Non-integer number";
}

catch(err) {
    console.log("Error: " + err);
    process.exit();
}

//Receive kashrut choices and update flags
var kosher = false, lemehadrin = false;
if (readlineSync.keyInYNStrict("Should it be kosher? ")) {
    kosher = true;
    lemehadrin = readlineSync.keyInYNStrict("Should it be Kashrut Lemehadrin? ");
}

//Receive food choice
var food = ["Salad","Sushi","Pizza"];

//Note: keyInSelect generates a 1-based list of options (1,2,3) but the user's choice is mapped to
//a 0-based list of items. So if a user picks e.g. 2, the value of chosenFood will be 1. 
//This is reflected in the switch statement below.
var chosenFood = readlineSync.keyInSelect(food, "What kind of food do you want? ",{cancel: false});

console.log(food[chosenFood] + ", a great choice!");

switch (chosenFood) {
    case 0:
        if (kosher == true) {
            if (lemehadrin == true) {
                console.log("We recommend 'Rejina Restaurant'. Enjoy!");
            }
            else {
                console.log("We recommend 'Chef Salad'. Enjoy!");
            }
        }
        else {
            console.log("We recommend 'Raisa Bar'. Enjoy!");
        }
    break;

    case 1:
        if (kosher == true) {
            if (lemehadrin == true) {
                console.log("We recommend 'Nini Hachi'. Enjoy!");
            }
            else {
                console.log("We recommend 'Oshi Oshi'. Enjoy!");
            }
        }
        else {
            console.log("We recommend 'Onami'. Enjoy!");
        }
    break;

    case 2:
        if (kosher == true) {
            if (lemehadrin == true) {
                console.log("We recommend 'Pizza Pino'. Enjoy!");
            }                    
            else {
                console.log("We recommend 'Pizza Golda'. Enjoy!");
            }
        }
        else {
            console.log("We reccomend 'Pizza Philippe'. Enjoy!");
        } 
    break;
}             
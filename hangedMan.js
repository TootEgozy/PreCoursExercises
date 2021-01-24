//Global constants:
const maxAttempts = 10; // maximum allowed wrong guesses
const guessWordOption = '@'; // special character to guess the entire word
const exitGameOption = '0'; // special character to immediately exit the game
//Global variables:
var readlineSync = require("readline-sync"); //readlineSync from the external library to handle user input
var attemptsCounter = 0; // how many wrong guess attempts have been made
var continuePlaying = true; // main game loop control flag
var myWord; // the word being guessed
var myChars = []; // an array of characters representing the word letters
var exposed = []; // a boolean 'control' array to represent which character in the word is exposed

//Some initial words to start up the game. Words can be added by the addWord() function.
var words = ["Argentina", "Graduate", "Optimism", "Squizzing", "Relaxation", "Volleyball", "Technology", "Adaptation", "Marshmallow", "Medicine", "Hippocampus"];

//Game art functions
function printLogo() {
    console.log("  _    _                                                       ");
    console.log(" | |  | |                             Welcome to:              ");            
    console.log(" | |__| | __ _ _ __   __ _ _ __ ___   __ _ _ __                ");
    console.log(" |  __  |/ _` | '_ \\ / _` | '_ ` _ \\ / _` | '_ \\            ");  
    console.log(" | |  | | (_| | | | | (_| | | | | | | (_| | | | |              "); 
    console.log(" |_|  |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|           ");
    console.log("********************* __/ |***********************             ");              
    console.log("                     |___/                                     ");              
}

function printLostGameArt() {
    console.log("=====================================");
    console.log("        +---+                        ");
    console.log("        |   |     You                ");
    console.log("        O   |      Lost :(           ");
    console.log("       /|\\  |                       ");
    console.log("       / \\  |  Better Luck          ");
    console.log("            |      Next Time!        ");
    console.log("\nThe word was: "+myWord);
    console.log("=====================================");
}

function printWonGameArt() {
    console.log("*****************************************************************************");
    console.log("     o  \\ o / _ o       __|  Congratulations! \\ /    |__      o _ \\ o /  o        "); 
    console.log("    /|\\   |    /\\  ___\\o  \\o     You           |   o/   o/__  /\\    |   /|\\    ");
    console.log("    / \\  / \\  | \\ /)  |   ( \\    won!         /o\\ / )   |  (\\ / |  / \\  / \\  ");
    console.log("\nThe word was: "+myWord);
    console.log("*****************************************************************************");
}

//Auxiliary function to add a new word to the game word bank.
function addWord(word) {
    words.push(word);
}

//Checks if the input character is a part of myWord. Also handles all possible cases and messages to the player.
//Receives: the guessed character
//Returns: true if this character is the LAST SUCCESSFUL GUESS (i.e. we have won the game). false - in all other cases.
function guessChar(guessedChar) {
    var foundFlag=false;
    var timesCharAppears = 0;
    var allExposed=true;

    //Main loop to go over the word
    for(var i=0; i<myChars.length; i++) {

        //Found the character in the word!
        if(myChars[i].toLowerCase()==guessedChar.toLowerCase()) {
  
            foundFlag = true;
            //Have we been here before? Is this the first time we guessed this character?
            //Let's check if it's already exposed.
            if (exposed[i]) {
                //Since we already gussed this character, it's exposed everywhere. No point in scanning further.
                console.log("You have already guessed that character, try again.");
                break;
            }
            else {
                //This the first time we're exposing the character, let's expose and count it.
                //timesCharAppears will be used to tell us if this is the first time we are exposing this character.
                exposed[i] = true;
                timesCharAppears++;
            }
        } else {
            //This is not the letter we guessed, but we're checking if it's exposed, because we'd like to see if all the other letters have been exposed.
            if (exposed[i] == false) allExposed = false;
        }
    }

    if (!foundFlag) {
        //In this case, our character wasn't found anywhere in the word. Counting it as a wrong guess!
        attemptsCounter++;
        var remainingAttempts = maxAttempts - attemptsCounter;
        console.log("Wrong, guess again! ");
        if (remainingAttempts > 0) console.log(remainingAttempts + " guesses remaining...");

    } else {
        //Okay, we found the character, but did we actually expose it, or is it a repeated guess of an already exposed charachter?
        if (timesCharAppears > 0) {
            console.log("Congratulations! The letter '"+guessedChar+"' appears "+timesCharAppears+" time(s) in this word!");
            if (allExposed) {
                console.log("As it happens, '"+guessedChar+"' was also the last letter you needed to guess the whole word.");
                return true;
            }
        }
    }
    return false;
}

//Generates a string to be displayed in place of the word being guessed. The string has asterisks in place of unexposed letters.
//Receives: nothing (checks the global arrays "myChars" and "exposed")
//Returns: the string to be displayed
function displayWord() {
    var tempWord = [];
    for(var i=0; i<exposed.length; i++) {
        if (exposed[i]) tempWord.push(myChars[i]);
        else tempWord.push("*");
    }

    return tempWord.join("");
}

//Test if inputChar is a single English letter with the regexp method "test()"
//Recives: a character
//Returns: true - if the character is an English letter, false - if it's not
function isCharALetter(char) {
    const regex = RegExp('[a-zA-Z]');
    return char.length == 1 && regex.test(char);
}

//Add a few more words to the game word bank.
addWord("Psychosomatic");
addWord("Alternative");
addWord("Alphabetical");
addWord("Professor");
addWord("Astronomy");
addWord("Initialization");

//Initialization and welcome messages.
printLogo();
console.log("Welcome to hangman!");
console.log("I'll think of a word and you'll have to guess it, one letter at a time.")
console.log("Watch it! You have up to "+maxAttempts+" wrong guesses before you lose the game!");
console.log("To guess the whole word, respond with '"+guessWordOption+"'.");
console.log("To exit the game at any time, respond with '"+exitGameOption+"'.");
myWord = words[Math.floor(Math.random() * words.length)];
myChars = myWord.split("");
for (var i = 0; i<myChars.length; i++) exposed.push(false);
    
//MAIN GAME LOOP
while (continuePlaying) {
    console.log("\nGuess the word: "+displayWord());
    var inputChar = readlineSync.question("Guess a letter from this word ("+guessWordOption+" - guess the entire word): ");
    //first - basic input validation
    if (isCharALetter(inputChar)) {
        //guessChar returns 'true' only if we have the winning guess!
        if (guessChar(inputChar.toLowerCase())) {
            printWonGameArt();
            continuePlaying = false;
        } 
        else if(attemptsCounter >= maxAttempts) {
            printLostGameArt();
            continuePlaying = false;
        }
    }
    //Player wishes to guess the entire word. Warn him of the risk!
    else if (inputChar == guessWordOption) {
        if (readlineSync.keyInYNStrict("Are you sure? You'll only have one shot!")) {
            var guessedWord = readlineSync.question("Guess the word: ");
            if (guessedWord.toLowerCase() == myWord.toLowerCase()) {
                printWonGameArt();
                continuePlaying = false;
            }
            else {
                console.log("Your guess was wrong!");
                printLostGameArt();
                continuePlaying = false;
            }
        } else {
            console.log("Okay, back to guessing letters...");
        }
    }
    else if (inputChar == exitGameOption) {
        console.log("Exiting the game, goodbye!");
        continuePlaying = false;
    }
    //This is the case when the user input doesn't match anything meaningful
    else console.log("Invalid input, try again.");
}





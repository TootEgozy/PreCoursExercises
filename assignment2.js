var readlineSync = require("readline-sync");

//spade, heart, diamond, club symbols
const suits = ['\u2660', '\u2665', '\u2665', '\u2663'];
//upper and lower constraints for each drawn card
const max = 12, min = 1;
//default balance for each player
const initialBalance = 50;

//auxiliary variables
var singlePlayer = false;
var player1Name = "", player2Name = "";
var player1Balance = initialBalance, player2Balance = initialBalance;
var player1Bets = true;
var continuePlaying = true;
var round = 0;
var bet = 0;

//Outputs a message to the console and terminates the program.
//Receives: message
//Returns: nothing
function throwOut(text) {
    console.log(text);
    process.exit();
}

//A function to randomly choose a name from a name bank.
//Receives: nothing
//Returns: a player name
function randomizeName() {
    const names = ["Moshiko","Moishele","Moishalah","Moshmosh","Mooshie","Moishi","Mosh","Moshe"];
    return names[Math.floor(Math.random() * names.length)];
}

//A function that prints the round number and the current balances for the players.
//Receives: nothing
//Returns: nothing
function displayPlayers() {
    console.log("Round " + round + " - player stats:");
    console.log("Player 1: " + player1Name + ", Balance: $" + player1Balance);
    if (!singlePlayer) console.log("Player 2: " + player2Name + ", Balance: $" + player2Balance);
}

//A function for the player(s) to place a bet. In a single player mod, checks that the bet is lower or equal to player balance.
//If the bet is higher, throws out the player and show a message.
//In multiplayer mod, checks that the bet is lower or equal to the lowest balance. If the bet is higher, asks to re-enter a bet.
//The function has a switch that flips every time it is called, to determine who's turn is it to place a bet.
//Receives: nothing 
//Returns: the value of the bet.
function obtainBet() {

    var maxBet;
    var bettingPlayerName;

    if (singlePlayer) {
        maxBet = player1Balance;
        bettingPlayerName = player1Name;
    }
    else {
        maxBet = Math.min(player1Balance,player2Balance);
        if (player1Bets) bettingPlayerName = player1Name;
        else bettingPlayerName = player2Name;
        player1Bets = !player1Bets;
    }

    var myBet = readlineSync.question(bettingPlayerName+", please enter your bet (between 1 and " + maxBet + "): ");

    if (singlePlayer) {
        if (myBet > player1Balance) throwOut("You've bit on more than you can chew, " + player1Name);
        else if (myBet == 0) throwOut("Betting on 0? Better get a life.");
        else if (myBet < 0) throwOut("A negative bet? Very funny.");
    } else {
        while (myBet > maxBet || myBet <= 0) {
            myBet = readlineSync.question("Your bet must not exceed both your balances, and be a POSITIVE number up to " + maxBet + ": ");
        }
    }

    return Number(myBet);
}

//A function that draws cards: Assign a card for a user by randomly choosing a number between 1-12.
//Compares the cards and return 1 if player 1 has the higher card, 2 if player 2 has the higher card, 0 for a tie.
//Shows the users messages for: the card chosen with a random suit symbol, who won and lost, and the sum of the bet that was transfered.
//Receives: nothing  
//Returns: 0 for draw, 1 for player 1 victory, 2 for player 2 victory. 
function drawCards() {
    var suit1 = suits[Math.floor(Math.random() * suits.length)];
    var suit2 = suits[Math.floor(Math.random() * suits.length)];
        
    var card1 = Math.floor(Math.random() * (max - min + 1) ) + min;
    var card2 = Math.floor(Math.random() * (max - min + 1) ) + min;

    console.log(player1Name + "'s card: " + card1 + String(suit1));
    console.log(player2Name + "'s card: " + card2 + String(suit2));

    if (card1 > card2) {
        console.log(player1Name+" wins this round and gets $"+bet+"!");
        return 1;
    }
    else if (card2 > card1) {
        if (!singlePlayer) console.log(player2Name+" wins this round and gets $"+bet+"!"); 
        else console.log(player1Name+" loses this round and $"+bet+"!");
        return 2;
    }
    else {
        console.log("This round is a tie!");    
        return 0;
    }
}

// MAIN SECTION
//Show a fancy looking title.
console.log("********************************************************");
console.log("*              >>>>> Welcome to WAR <<<<<              *");                            
console.log("********************************************************");
console.log("");

//Get the player name(s):
//Player1 can choose a name or skip by pressing ENTER - in that case he'll get a randomly chosen name.
player1Name = readlineSync.question("Player 1, please enter your name: ");
if (player1Name == "") {
    player1Name = randomizeName();
    console.log("Don't wanna enter a name? No problem, I'll just call you "+player1Name+"!");
}

//Player2 can now choose a name or skip by pressing ENTER. If they skip, Computer will be assigned as player 2 and the game will be played in
//"Single Player" mode.
player2Name = readlineSync.question("Player 2, please enter your name [or press ENTER to play vs the computer]: ");
if (player2Name == "") {
    singlePlayer = true;
    player2Name = "Computer";
}

//Game loop: 
//Display current balance status for player 1 and optionaly player 2 (the Computer doesn't have a "balance" and doesn't list as a "player").
//The player then places a bet (in 2 player mode, the game switches between which player is asked to place a bet - player 1 goes first).
//The game then draws the cards and announces who won and updates the balances (unless it's a tie).
//In 2 player mode, the players take turns in selecting the bet. The winning player is the one whose drawn card is higher.
//Bets are limited to the MINIMUM of both player balances (because we do not allow negative balance).
//When one of the players (or player1 in Single Player) reaches balance 0 - they are broke and the game is over.
//If none of the players are broke at the end of each round, the game asks if they want another round.
//If player(s) chooses no, the game will quit.
while(continuePlaying) {
    round++;
    console.log("");
    displayPlayers();
    console.log("");
    bet = obtainBet();
    var roundResult = drawCards();
    console.log("");

    if (roundResult != 0) {

        if (roundResult == 1) {
            player1Balance += bet;
            if (!singlePlayer) {
                player2Balance -= bet;
                if (player2Balance <= 0) throwOut(player2Name+" is broke, game over!\n"+player1Name+" wins with $"+player1Balance); 
            }

        } else {
            player1Balance -= bet;
            if (!singlePlayer) {
                player2Balance += bet;
                if (player1Balance <= 0) throwOut(player1Name+" is broke, game over!\n"+player2Name+" wins with $"+player2Balance); 
            } else {
                if (player1Balance <= 0) throwOut(player1Name+" is broke, game over!"); 
            }                
        }
    }
    
    continuePlaying = readlineSync.keyInYNStrict("Another round?");
}

if (singlePlayer) {
    console.log(player1Name+" chose to leave with their money - $"+player1Balance+"!");
} else {
    console.log(player1Name+" and "+player2Name+" have mutually agreed to end this game. They each have:");
    console.log(player1Name+": $"+player1Balance);
    console.log(player2Name+": $"+player2Balance);
}


var readlineSync = require('readline-sync');

function validateNum(num) {
    return (!Number.isNaN(num) && Number.isInteger(Number(num)) && Number(num) >= 2 )
}

//Get a number from the user (num)
var num = readlineSync.question("Please enter a positive integer (2 and above): ");
if (!validateNum(num)) {
    console.log("Wrong input. Enter a positive integer larger than 1!");
    process.exit();
}

//The flags array represents our input range (between 1 and num).
//flags[N] is true if N is prime. 
//This is initialized to 'true' (except flags[0] and flags[1]) to be used with 'Sieve of Erastothenes' algorithm.
var flags = [false,false];
for (var i = 0; i < num-1; i++)
    flags.push(true);

//Using Sieve of Erastothenes to filter out the prime numbers in range.

//scanning loop:
for (var i=0; i<=num; i++) {
    if (flags[i]) {
        //sieving loop:
        for (var j = i+1; j <= num; j++ ) {
           if (j % i == 0) flags[j] = false;
        }
    }
}

var primes = "2";
for (var i = 3; i<=num; i++) 
    if (flags[i]) primes += ", " + i;

console.log('Primes between 1 and '+num+':');
console.log(primes);
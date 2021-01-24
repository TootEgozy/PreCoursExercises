const firstNum = 1;
const maxNum = 100;

//Check if a number is a product of 7 or has a digit "7"
function checkNum(num) {
    return (num % 7 == 0) || (String(num).includes("7"));
}
 
//If the number passes checkNum, replace it with BOOM, otherwise return the same number
function boom(num) {
    if (checkNum(num))
        return "BOOM";
    else 
        return String(num);
}

//Generates the output
var result = boom(firstNum);
for (var num = 2; num <= maxNum; num++) {
    result += ", "+boom(num);
}

console.log(result);











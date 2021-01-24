//A function to join to arrays
//I chose to use concat() from Javascript library because the exercise does not explicitly request us to manually concatenate arrays.
//If required, I will rewrite this function as a loop concatenation.
//Receives: two arrays
//Returns: a concatenated array 
function joinArrays (arr1, arr2) {
    return arr1.concat(arr2);
}

//Define two string arrays:
sillyWords = ["foo","bar","rabbit","hole"];
countries = ["Spain","Finland","Germany","Scotland","Italy","Greece"];

console.log("First array: "+sillyWords);
console.log("Second array: "+countries);

//Print the joind array.
console.log("The joined array: "+joinArrays(sillyWords,countries));
var readlineSync = require('readline-sync');
var question = [], answers = [], verdict = [];

//Adds a new question 
function addQuestion(questionText) {
    question.push(questionText);
}

//Adds a group of four "answers" with their weights for the corresponding question
function addAnswers(answersArray) {
    answers.push(answersArray);
}

//Adds a new verdict with its corresponding score threshold.
//Note that this is the *upper* threshold (so this verdict is chosen if totalScore <= threshold)
//The last added verdict is for the highest total scores, so it has NO upper threshold. This value can be arbitrary and is ignored.
function addVerdict(verdictText, verdictThreshold) {
    verdict.push([verdictText,verdictThreshold]);
}

//Convert a group of possible answers to an array of 4 strings for compatibility with keyInSelect function
function extractAnswers(numOfQuestion) {
    var result = [];
    var i;

    for (i=0; i < answers[numOfQuestion].length; i++) 
        result.push(answers[numOfQuestion][i][0]);

    return result;
}

//Obtain the index of the verdict with the LOWEST upper threshold that is larger or equal to totalScore
function getVerdict() {
    var i;
    for (i = 0; i < verdict.length; i++) {
        if (totalScore <= verdict[i][1]) return i;
    }
}

//The quiz title
var quizTitle = 'How green are you?';

//Create the bank of questions and answers
addQuestion('What is your main traveling method?');
addAnswers([['I drive my car',25],
            ['I ride my bicycle',100],
            ['I rely on public transportation',50],
            ['Most of the time, I walk or hitchhike',100]]);
            
addQuestion('What is your diet?');
addAnswers([['I am vegan',75],
            ['I eat meat',0],
            ['I am freegan',100],
            ['I am trying to cut on animal products',50]]);
            
addQuestion('What do you do for a living?');
addAnswers([['I work for a fossil fuel company, fast-fashion production, or the animal industry.',0],
            ['I work in a place that supports or uses one of the above.',25],
            ['I work in a green company, or one that follows strict green criteria.',100],
            ['As far as I know, my work has nothing to do with this subject.',50]]);

addQuestion('Where did you get your pet?');
addAnswers([['I bought my pet from a breeder or a seller.',0],
            ['I have adopted my pet from a shelter, from the streets, or from someone elses home.',75],
            ['I have adopted an animal - industry or an animal testing survivor.',100],
            ['I do not own a pet.',50]]);

addQuestion('How do you usually get your clothing?');
addAnswers([['I buy it at a shop or online.',25],
            ['I buy it in a fair trade, green type of shop.',75],
            ['I buy it in the thrift shop.',100],
            ['Only receive used clothing for free, I almost never buy it.',100]]);

addQuestion('What do you think about climate change, pollution and wildlife extinction?');
addAnswers([['That is the price of technology and human advancement.',0],
            ['Our governments have to stop this. We must Act now!',100],
            ['I try my best to be environmentally-friendly.',75],
            ['To be honest, I have other things to worry about.',0]]);
          
addQuestion('Are you an activist?');
addAnswers([['Yes, I take part in protests and direct action.',100],
            ['Not really, but I speak about environmental issues.',50],
            ['No, and I find protesters annoying.',0],
            ['No, this is a waste of time. Nothing will ever be changed.',25]]);
       
addQuestion('How do you handle your waste?');
addAnswers([['I throw it into the garbage bin.',0],
            ['I have almost no waste, because I only get things that are degradable or reusable.',100],
            ['I separate and recycle most of my household waste.',75],
            ['I recycle some of my waste.',25]]);
           
addQuestion('What kind of a shopper are you?');
addAnswers([['I just buy what I need or want on a regular basis.',25],
            ['I love shopping. I buy things for fun.',0],
            ['I am trying to reduce waste by buying new things only when there is no alternative.',75],
            ['I almost never buy anything first-hand.',100]]);
            
addQuestion('Do you have a philosophical take on nature?');
addAnswers([['Yes. We are a part of nature and must live in peace with it.',100],
            ['Yes. We are in charge of nature and it is our duty to reserve it',100],
            ['Yes. We humans are above nature and can use it for our needs.',0],
            ['No :)',25]]);

//Bank of final verdicts with their thresholds
//Verdicts MUST be added in the increasing order of "Threshold"! Last verdict comes with arbitrary threshold.
addVerdict("You directly contribute to the destruction of Earth and the wildlife.\nFuture generations will remember this.",350);
addVerdict("You just don't care about the enviroment. You can do more. This is your home planet.",550);
addVerdict("Good job! You do your best to live environmentally friendly life.\nThis should be enough, but wer'e in a crisis. Consider more activism.",750);
addVerdict("Amazing! You fight for the survival of humanity and the wildlife. Because of you, the change will come.", 9999);

var i;
var totalScore = 0;

//Welcome intro
console.log('########################################');
console.log('Welcome to the quiz "'+quizTitle+'"');
console.log('########################################');
//Main quiz loop - present questions to the user.
for (i = 0; i < question.length; i++) {
    //ask a question and return the index of the chosen answer
    var chosenAnswer = readlineSync.keyInSelect(extractAnswers(i), question[i]);

    //If the user chose "CANCEL" - end the quiz.
    if (chosenAnswer < 0) {
        console.log("Okay, nevermind!")
        process.exit();
    } 

    //accumulate total score from the answer's score
    totalScore += answers[i][chosenAnswer][1];
}
console.log("Final verdict:")
//Present the final verdict
console.log(verdict[getVerdict()][0]);
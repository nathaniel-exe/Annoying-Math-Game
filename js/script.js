// variables

var x;
var y;
var answer;

var rightAnswer = [];

var wrongAnswer = [];

var color;
var questionState = 0;

// time for the game, can be changed so that the game is either longer/shorter

var timeLeft = 29;

function askQuestion() {
    
    // generates questions, the 2 numbers to be added to each other
    
    x = Math.floor(Math.random() * 101);

    y = Math.floor(Math.random() * 101);

    answer = x + y;
    
    // hides the unecessary elements at the start of the game, and shows the necessary elements

    document.getElementById('question').innerHTML = "" + x + " + " + y + "";

    document.getElementById('start-btn').style.display = "none";
    
    document.getElementById('description').style.display = "none";

    document.getElementById('math-input').style.display = "block";

    document.getElementById('answer-question').style.display = "block";
    
    document.getElementById('math-input').focus();
};

// function that checks if the question is correct or incorrect when submitting an input

function answerQuestion() {
    var guess = answer;

    if (document.getElementById('math-input').value == guess) {
        rightAnswer.push(document.getElementById('math-input').value);

        var correct = document.getElementById('correct');
        correct.play();

        askQuestion();

        document.getElementById('math-input').value = "";
    } else {
        wrongAnswer.push(document.getElementById('math-input').value);

        askQuestion();

        var incorrect = document.getElementById('incorrect');
        incorrect.play();

        document.getElementById('math-input').value = "";
    };
};


// countdown timer that ticks down and ends the game when the time runs out

function countdown() {

    document.getElementById('timer').innerHTML = '30 seconds remaining';

    setInterval(function () {
        if (timeLeft < 0) {

            countdownFinish();

        } else {
            document.getElementById('timer').innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }, 1000);

};

// function that runs when the timer runs out that hides all elements except the users score

function countdownFinish() {
    var totalRightAnswer = rightAnswer.length;

    if (totalRightAnswer == 1) {
        document.getElementById('question').innerHTML = "You got " + totalRightAnswer + " question correct!";

        document.getElementById('timer').innerHTML = "";

        document.getElementById('math-input').style.display = "none";

        document.getElementById('answer-question').style.display = "none";

        document.getElementById('math-input').style.display = "none";

        document.getElementById('answer-question').style.display = "none";

        document.getElementById('play-again').style.display = "table";

        document.body.style.backgroundColor = black;

        var sounds = document.getElementsByTagName('audio');
        for (i = 0; i < sounds.length; i++) sounds[i].pause();

    } else {
        document.getElementById('question').innerHTML = "You got " + totalRightAnswer + " questions correct!";

        document.getElementById('timer').innerHTML = "";

        document.getElementById('math-input').style.display = "none";

        document.getElementById('answer-question').style.display = "none";
        
        document.getElementById('math-input').style.display = "none";

        document.getElementById('answer-question').style.display = "none";

        document.getElementById('play-again').style.display = "table";

        document.body.style.backgroundColor = black;

        var sounds = document.getElementsByTagName('audio');
        for (i = 0; i < sounds.length; i++) sounds[i].pause();
    }
};

// function that generates a random colour to flash in the background to distract the player

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

};

// function that changes the background colour to the colour generated by the previous funciton

function backgroundChange() {

    setInterval(function () {
        if (timeLeft < 0) {
            document.body.style.backgroundColor = "#000";

        } else {

            getRandomColor();

            document.body.style.backgroundColor = color;

        }
        // is set to run every tenth of a second
    }, 100);
};

// function that plays an audio file that reads out a random number to distract the player

function distractAudio() {

    setInterval(function () {
        if (timeLeft < 0) {

        } else {

            var randomAudio = Math.floor(Math.random() * 41);
            console.log(randomAudio);

            var numberAudio = document.getElementById('audio' + randomAudio + '');

            numberAudio.play();
        }
        // runs every half second
    }, 500);

};

// function that changes the order of the question to distract the player

function questionChange() {

    setInterval(function () {
        if (questionState == 1 && timeLeft > 0) {

            questionState = 0

            document.getElementById('question').innerHTML = "" + x + " + " + y + "";

        } else if (questionState == 0 && timeLeft > 0) {

            questionState = 1;

            document.getElementById('question').innerHTML = "" + y + " + " + x + "";
        }
        // is set to run every half second
    }, 500);
};

// runs the correct functions to start the game when the start button is clicked

document.getElementById('start-btn').onclick = function () {
    askQuestion();
    countdown();
    backgroundChange();
    questionChange();
    distractAudio();
};

// runs the answerQuestion function when the user submits an answer

document.getElementById('answer-question').onclick = function () {
    answerQuestion();
};

// reloads the game when the user selects play again

document.getElementById('play-again').onclick = function () {
    location.reload();
};

// runes the answerQuestion function when the Enter key is pressed

document.getElementById('math-input').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('answer-question').click();
    }
});

// alert("Hello");
var flag = true;
var level = 0;

$(document).keydown(function () {
    if (flag) {
        $("h1").text("Level " + level);
        nextSequence();
        flag = false;
    }
});

var userClickedPattern = [];

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
}

var mouseClick = 0;
$(".btn").click(function handler(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    
    $("#" + userChosenColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
    
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] ==  gamePattern[currentLevel]) {
        console.log("Success");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        console.log("Failure");
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    flag = true;
    gamePattern = [];
    userClickedPattern = [];
}
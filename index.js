var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userpattern=[];

var level=0;

var started=false;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level "+level)
        nextSequence();
        started=true;
    }
});


function nextSequence()
{
    level++;
    userpattern=[];
    $("#level-title").text("Level "+level);

    var rand=  Math.floor(Math.random()*4);
    var randomColor=buttonColors[rand];
    gamePattern.push(randomColor);
    
    animatePress(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

$(".btn").click(function(event){
    var userButton=this.id;
    userpattern.push(userButton);
    playSound(userButton);
    animatePress(userButton);
    checkAnswer(userpattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if (userpattern[currentLevel]==gamePattern[currentLevel])
    {
        if (userpattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else 
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over , Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
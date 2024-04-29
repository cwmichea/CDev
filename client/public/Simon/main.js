$("#tryagain").css("display", "none")

function nextSequence() {
    let num = Math.round((Math.random() * 3.499)-0.49)   ; 
    return num;
}
// audio
let redAudio = new Audio();
let blueAudio = new Audio();
let greenAudio = new Audio();
let yellowAudio = new Audio();
let wrongAudio = new Audio();
redAudio.src = "./sounds/red.mp3";
blueAudio.src = "./sounds/blue.mp3";
greenAudio.src = "./sounds/green.mp3";
yellowAudio.src = "./sounds/yellow.mp3";
wrongAudio.src = "./sounds/wrong.mp3";
//array colors, array pattern
let buttonColors = ["red", "blue", "green", "yellow"];
// let chosenColor = buttonColors[nextSequence()];
let gamePattern = [];
let playerPattern = [];
let lvl = 0;
let index = 0;
let wrong = false;
//check
// console.log(nextSequence());
// alert("hi "+nextSequence() + chosenColor + " " + gamePattern);

function animateBtn(chosenColor, wrong, index){
    //select
    let currentBtn = $("#"+chosenColor)
    //animate
    .css("border", "0.5vw white solid");
    currentBtn.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    currentBtn.css("border", "0.5vw solid black");
    //add color to player array
    // playerPattern.push(chosenColor);
    //play audio
    if (wrong) {
        chosenColor = "wrong"
    }
    switch (chosenColor) {
        case "red":
            redAudio.play();     
            break;
        case "blue":
            blueAudio.play();     
            break;
        case "green":
            greenAudio.play();     
            break;
        case "yellow":
            yellowAudio.play();     
            break;
        default:
            wrongAudio.play();
            break;
    }

    console.log("playerPattern: "+ playerPattern);
    console.log("gamePattern: "+ gamePattern);
}

function check(clickedColor, index){
    console.log("clciked: "+clickedColor);
    console.log("clciked: "+gamePattern[index]);
    console.log("index: "+index);
    if (clickedColor !== gamePattern[index]) {
        return true;
    } else {
        return false;
    }

}
// animateBtn(chosenColor);
// for (let i = 0; i < $("btn").length ; i++) {
//     $(".btn")[i].click(animateBtn(this.attr("id")));// return an array    
// }

// $(".btn").each(function() {
//     $(this).on("click", function() {
//         animateBtn($(this).attr("id"));
//     });
// });
function goOnNextLvl(){
    startGame()
}

let buttons = $(".btn");
for (let i = 0; i < buttons.length; i++) {
    $(buttons[i]).on("click", function() {
        wrong = check($(this).attr("id"), index);
        if (wrong) {
            $("#tryagain").css("display", "block")
            $("body").css("background-color", "red")
            index = 0; 
            setTimeout(function(){
                $("body").css("background-color", "#011F3F")
            }, 200)
            setTimeout(function() {
                $("#tryagain").css("display", "none")
            }, 777);  
        } else {
            index++;
        }
        animateBtn($(this).attr("id"), wrong);
        playerPattern.push($(this).attr("id"));
        if (gamePattern.length === index) {
            lvl++;
            $("#level-title").text(`✅`);
            setTimeout(function() {
                goOnNextLvl();
            }, 1500); // Adjust the delay time (in milliseconds) as needed
        }
            
    });
}
function  startGame(){
    console.log("empezo la wea")
    gamePattern.push(buttonColors[nextSequence()]);
    console.log(gamePattern);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            animateBtn((gamePattern[i]), false);
        }, i*700);
    }
    $("#level-title").text(`level ${lvl}`);
    index = 0;
}

$(document).on("keydown", function(event) {
    startGame();
    $("#level-title").text(`level ${lvl}`);
});
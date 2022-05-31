let buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
]

let gamePattern = [ ]
let userClickedPattern = [ ]

let started = false
let level = 0

//I looked at Angela's example for this one↓
$(document).keypress(function() {

    if (!started) {

        $("#level-title").text("Level " + level)

        nextSequence()

        started = true
        
    }
})

$(".btn").click(function() {

    //I looked at Angela's example for this one↓
    let userChosenColor = $(this).attr("id")

    userClickedPattern.push(userChosenColor)

    console.log(userClickedPattern)

    playSound(userChosenColor)

    animatePress(userChosenColor)

    //I looked at Angela's example for this one↓
    checkAnswer(userClickedPattern.length-1)
})

let checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }else{
        console.log("wrong")

        //if the user gets the sequence wrong
        startOver()

        playSound("wrong")
        $("body").addClass("game-over")

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")
    }
}

let nextSequence = () => {

    userClickedPattern = [ ]

    //I looked at Angela's example for these two↓     
    level++
    $("#level-title").text("Level " + level)

    let randomNum = Math.floor(Math.random()*4)

    let randomChosenColor = buttonColors[randomNum]
    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)

}

let startOver = () => {
    level = 0
    gamePattern = [ ]
    started = false
    
}

let playSound = (name) => {
    let audio = new Audio ("sounds/" + name + ".mp3")
    audio.play()
}

let animatePress = (currentColor) => {
    
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


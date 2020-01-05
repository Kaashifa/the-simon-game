var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
   if (!start) {
      gamePattern = [];
      level = 0;
      $("#level-title").text("Level " + level);
      nextSequence();
   }
   start = false;
});

function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {

         setTimeout(function () {
            nextSequence();
         }, 1000);

      }
   } else {
      $("body").addClass("game-over").delay(200).queue(function (next) {
         $(this).removeClass("game-over");
         next();
      });
      playSound("wrong")
      $("h1").text("Game Over, Press any key to Restart");

   };
};

function nextSequence() {
   
   userClickedPattern = [];
   level++;
   $("h1").text("Level " + level);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   playSound(randomChosenColour)

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
};


$(".btn").on("click", function () {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed").delay(100).queue(function (next) {
      $(this).removeClass("pressed");
      next();
   });
}

function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

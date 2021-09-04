var game = [];
var col = ["green", "red", "yellow", "blue"];
var glvl = 0,
  plvl = 0;

function press(e) {
  $(e).addClass("pressed");
  setTimeout(function() {
    $(e).removeClass("pressed");
  }, 200);
}

function play_audio(file) {
  var audio = new Audio("sounds/" + file + ".mp3");
  audio.play();
}
$("body").keydown(function(event) {
  if (!glvl) {
    fetch_next();
  }
})
$(".btn").click(function(event) {
  play_audio(event.target.classList[1]);
  press(event.target);
  if (glvl) {
    if (check(event.target.classList[1])) {
      plvl++;
      if (plvl === glvl) {
        fetch_next();
      }
    } else
      wrong(event);
  } else
    wrong(event);
})

function fetch_next() {
  glvl++;
  plvl = 0;
  $("h1").text("Level " + glvl);
  var num = Math.floor(Math.random() * 4);
  game.push(col[num]);
  play_audio(col[num]);
  setTimeout(function() {
    press("." + col[num]);
  }, 400)
}

function check(plr) {
  if (plr === game[plvl])
    return true;
  else
    return false;
}

function wrong(event) {
  play_audio("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  game = [];
  glvl = 0;
  plvl = 0;
}
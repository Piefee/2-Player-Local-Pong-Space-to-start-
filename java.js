
var fps = 60;
var pos = [.485 * window.innerWidth, .485 * window.innerHeight];
var dir = true;
var lup = false;
var ldown = false;
var rup = false;
var rdown = false;
var score = [0,0];
var ballSpeed = (window.innerWidth/(fps*2));
var frames = 1;
var x = 1;
var y = 0;
var started = false;
var updateId;
document.addEventListener('keydown', (event) => {
  var key = event.key;
  if(key == " " && started == false){
    started = true;
    updateId = setInterval(update, 1000/fps);
  }
  if(key == "w"){
    lup = true;
  }
  if(key == "s"){
    ldown = true;
  }
  if(key == "ArrowUp"){
    rup = true;
  }
  if(key == "ArrowDown" ){
    rdown = true;
  }
}, false);
document.addEventListener('keyup', (event) => {
  var key = event.key;
  if(key == "w"){
    lup = false;
  }
  if(key == "s"){
    ldown = false;
  }
  if(key == "ArrowUp"){
    rup = false;
  }
  if(key == "ArrowDown"){
    rdown = false;
  }
}, false);
function update(){
    frames++;
    if(frames == 60){
        frames = 0;
    }
    document.getElementById("fps").textContent = frames;
    ballSpeed = ballSpeed + ((window.innerWidth/(fps*2))*.001666666667);
  if(dir){
    pos[0] = pos[0] + ballSpeed;
    document.getElementById("ball").style.left = pos[0] + "px";
  } else {
    pos[0] = pos[0] - ballSpeed;
    document.getElementById("ball").style.left = pos[0] + "px";
  }
  pos[1] = pos[1] + y;
  document.getElementById("ball").style.top = pos[1] + "px";
  if(pos[0] + document.getElementById("ball").offsetWidth > window.innerWidth * .9){
    if(collision("right")){
        dir = false;
    } else {
        reset("left")
    }
  }
  if(pos[0] < .1 * window.innerWidth){
    if(collision("left")){
        dir = true; 
    } else {
        reset("right")
    }
  }
  if(document.getElementById("ball").offsetTop < 0){
    y = y * -1;
  }
  if(document.getElementById("ball").offsetTop + document.getElementById("ball").offsetHeight> window.innerHeight){
    y = y * -1;
  }
  if(lup&& document.getElementById("left").offsetTop > 0){
    document.getElementById("left").style.top = document.getElementById("left").offsetTop - (window.innerWidth * (1.3/(fps*2))) + "px";
}
  if(ldown&& document.getElementById("left").offsetTop +document.getElementById("left").offsetHeight < window.innerHeight * .99){
    document.getElementById("left").style.top = document.getElementById("left").offsetTop + (window.innerWidth * (1.3/(fps*2))) + "px";
  }
  if(rup&& document.getElementById("right").offsetTop > 0){
    document.getElementById("right").style.top = document.getElementById("right").offsetTop - (window.innerWidth * (1.3/(fps*2))) + "px";
  }
  if(rdown&& document.getElementById("right").offsetTop +document.getElementById("right").offsetHeight < window.innerHeight * .99){
    document.getElementById("right").style.top = document.getElementById("right").offsetTop + (window.innerWidth * (1.3/(fps*2))) + "px";
  }
}
function number(string){
  let temp = "";
  for(var i = 0; i < string.length-2;i++){
    temp = temp + string[i]
  }
  return temp;
}
function collision(side){
  if(document.getElementById("ball").offsetTop + document.getElementById("ball").offsetHeight>document.getElementById(side).offsetTop){
    if(document.getElementById("ball").offsetTop<document.getElementById(side).offsetTop + document.getElementById(side).offsetHeight){
      x = document.getElementById("ball").offsetWidth * 2;
      y = (document.getElementById("ball").offsetTop+ document.getElementById("ball").offsetHeight/2) - (document.getElementById(side).offsetTop+ document.getElementById(side).offsetHeight/2)
      y = y * .17;
      return true
    }
  }
  return false;
}
function reset(winner){
  if(winner == "right"){
    score[1]++;
  } else {
    score[0]++;
  }
  y = 0;
  x = 1;
  document.getElementById("score").textContent = score[0] + " - " + score [1];
  pos = [.485 * window.innerWidth, .485 * window.innerHeight];
  document.getElementById("ball").style.left = .485 * window.innerWidth;
  document.getElementById("ball").style.top = .485 * window.innerHeight;
  document.getElementById("left").style.top = "45vh";
  document.getElementById("right").style.top = "45vh";
  ballSpeed = (window.innerWidth/(fps*2));
  if(dir){
    dir = false;
  } else {
    dir = true;
  }
  clearInterval(updateId);
  update();
  setTimeout(function(){
    updateId = setInterval(update, 1000/fps);
  }, 1000);
}
// declare variables
let myColor, myName;

// Create a new connection using socket.io (imported in index.html)
let socket = io();

// this sketch can recognize these events
socket.on("connect", newConnection);
socket.on("transmitColor", receiveColor);
socket.on("welcomeNewUser", showWelcome);
socket.on("mouseBroadcast", otherMouse);

// define functions hereafter
function newConnection() {
  console.log("your id:", socket.id);
}
function receiveColor(color) {
  console.log("Your color is", color)
  myColor = color
  myName = window.prompt(
    "Hello hooman, how can I call you?",
    "type here your username");
  const userData = {
    name: myName,
    color: myColor
  }
  socket.emit("name", userData);
}
function showWelcome(data){
  console.log("new connection from", data)
  push()
    fill(data.color)
    textAlign(CENTER)
    translate(random(30,width-30),random(10,height-10))
    text("Hello "+data.name, 0,0)
  pop()
}
function otherMouse(data) {
  push()
    noStroke();
    fill(data.color);
    ellipse(data.x, data.y, 10);
  pop()
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // evert draw cycle, add a background with low opacity
  // to create the "fade" effect
  background(255, 255, 255, 1);
}

function mouseDragged() {
  push()
    noStroke();
    fill(myColor);
    ellipse(mouseX, mouseY, 10);
  pop()

  // create an object with data
  let data = {
    x: mouseX,
    y: mouseY,
    color: myColor
  };
  // send data to server
  socket.emit("mouse", data);
}
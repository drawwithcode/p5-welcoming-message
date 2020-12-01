// load express library
let express = require("express");
// create the app
let app = express();
// define the port where client files will be provided
let port = process.env.PORT || 3000;
// start to listen to that port
let server = app.listen(port);
// provide static access to the files
// in the "public" folder
app.use(express.static("public"));
// load socket library
let socket = require("socket.io");
// create a socket connection
let io = socket(server);
// define which function should be called
// when a new connection is opened from client
io.on("connection", newConnection);
// callback function: the paramenter (in this case socket)
// will contain all the information on the new connection
function newConnection(socket) {
  //when a new connection is created, generate a color and print its id
  const _color = getRandomColor();
  console.log("socket:", socket.id, _color);
  socket.emit('transmitColor', _color)

  //define what to do on different kind of messages
  socket.on("name", newUser);
  function newUser(data){
    socket.broadcast.emit("welcomeNewUser", data);
  }

  socket.on("mouse", mouseMessage);
  // create the mouseMessage function
  function mouseMessage(data) {
    // send the data to all the other clients
    socket.broadcast.emit("mouseBroadcast", data);
    // log the sent data
    // console.log(socket.id, data);
  }
}

console.log("node server is running");


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const nicknameSavingHelperFunctions = require("./helpers/read-to-file.js");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});

const connectedSockets = [];


app.post("/set-nickname", async (req, res) => {
    await nicknameSavingHelperFunctions.readFile(__dirname + "/models/nicknames.json");
    await nicknameSavingHelperFunctions.updateFile(__dirname + "/models/nicknames.json", req.body.nickname);
    res.send(`New nickname is${res} ${req.body}`);
})

io.on('connection', (socket) => {
    let nickname;

    socket.on('set nickname', (nick) => {
        nickname = nick;
        connectedSockets.push({ socket, nickname });
        console.log(connectedSockets);
    });
    
    socket.on('user typing', (nickname) => {
        socket.broadcast.emit('user typing', { nickname });
    });
  
    socket.on('disconnect', () => {
      const index = connectedSockets.findIndex((entry) => entry.socket === socket);
      if (index !== -1) {
        const { nickname } = connectedSockets[index];
        connectedSockets.splice(index, 1);
        io.emit('user disconnected', nickname);
      }
    });
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', { message: msg.msg, nickname: msg.nickname });
    });
  });
  
  app.get('/connections', async (req, res) => {
    const nicknames = await nicknameSavingHelperFunctions.readFile(__dirname + "/models/nicknames.json");
    nicknames.map((entry) => entry.nickname);
    res.json({
      connections: nicknames,
    });
  });
  

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/views/css'))
app.use(express.static(__dirname + '/public/logic'))

server.listen(3000, () => {
  console.log('listening on *:3000');
});
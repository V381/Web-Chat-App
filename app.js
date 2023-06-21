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



app.post("/set-nickname", async (req, res) => {
    await nicknameSavingHelperFunctions.readFile(__dirname + "/models/nicknames.json");
    await nicknameSavingHelperFunctions.updateFile(__dirname + "/models/nicknames.json", req.body.nickname);
    res.send(`New nickname is${res} ${req.body}`);
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', (msg) => {
        io.emit("user disconected", msg)
    });
    socket.on('chat message', (msg, nick) => {
        io.emit('chat message', {message: msg, nickname: nick});
    });
});

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/views/css'))
app.use(express.static(__dirname + '/public/logic'))

server.listen(3000, () => {
  console.log('listening on *:3000');
});
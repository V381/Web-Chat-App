const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const mime = require("mime");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.post("/set-nickname", (req, res) => {
    res.send(`New nickname is${re}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', (msg) => {
        io.emit("user disconected", msg)
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/views/css'))
app.use(express.static(__dirname + '/public/logic'))

server.listen(3000, () => {
  console.log('listening on *:3000');
});
const nicknameSavingHelperFunctions = require("./helpers/read-to-file.js");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});

const connectedSockets = new Map();
let nicknames = require('./models/nicknames.json');

io.on('connection', (socket) => {
    let nickname;

    socket.on('set nickname', (nick) => {
        nickname = nick;
        connectedSockets.set(socket.id, nickname);
        io.emit("add-nickname-to-list", nickname);
        io.emit('user connected', nickname);
        updateNicknameList();
    });

    socket.on('remove nickname', () => {
        if (!nickname) return;
        connectedSockets.delete(socket.id);
        updateNicknameList();
        io.emit("update nickname list", nickname);
    });

    socket.on('user typing', (nickname) => {
        socket.broadcast.emit('user typing', { nickname });
    });

    socket.on('disconnect', () => {
        const disconnectedNickname = connectedSockets.get(socket.id);
        connectedSockets.delete(socket.id);
        io.emit('user disconnected', disconnectedNickname);
        updateNicknameList();
    });

    io.emit('user connected', nickname);

    socket.on('chat message', (msg) => {
        io.emit('chat message', { message: msg.msg, nickname: msg.nickname });
    });
});

function updateNicknameList() {
    nicknames = Array.from(connectedSockets.values()).map((nickname) => ({ nickname }));
    fs.writeFileSync('./models/nicknames.json', JSON.stringify(nicknames));
}

app.get('/connections', async (req, res) => {
    const nicknames = await nicknameSavingHelperFunctions.readFile(__dirname + "/models/nicknames.json");
    nicknames.map((entry) => entry.nickname);
    res.json({
        connections: nicknames,
    });
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views/css'));
app.use(express.static(__dirname + '/public/logic'));

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('listening on *:3000');
});

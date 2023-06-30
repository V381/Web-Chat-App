import { replaceEmoticonCodesWithEmoticons } from "./emoticons.mjs";

const socket = io();
const messages = document.querySelector(".messages");
const form = document.getElementById('form');
const input = document.getElementById('input');
const nicknames = document.querySelector(".nicknames > li");

function getCurrentTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDateTime = `${day}-${month} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            nickname: localStorage.getItem("nickname"),
            msg: input.value
        });
        input.value = '';
    }
});

socket.on('add-nickname-to-list', (nickname) => {
    const nicknamePanel = document.querySelector('.nicknames');
    const li = document.createElement('li');
    li.textContent = nickname;
    nicknamePanel.appendChild(li);
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    const messageWithEmoticons = replaceEmoticonCodesWithEmoticons(msg.message);
    item.innerHTML = `<b>${msg.nickname}</b>: <i>${getCurrentTime()}</i> <br> ${messageWithEmoticons}`;
    messages.appendChild(item);
    messages.scrollIntoView({ behavior: "smooth", block: "end" });
});

socket.on("user connected", (nickname) => {
    const item = document.createElement('li');
    if (nickname !== null) {
        item.textContent = `${nickname} connected...`;
        messages.innerHTML = "";
        messages.appendChild(item);
    }
});

// socket.on("user disconnected", (nickname) => {
//     const listItem = [...document.querySelector(".nicknames").children ].find((val) => {
//         return val.textContent.toLowerCase() === nickname.toLowerCase();
//     })
//     if (listItem) {
//         listItem.remove();
//         localStorage.removeItem("nickname");
//     }
// });

socket.on("update nickname list", (nickname) => {
    localStorage.removeItem("nickname");
});

socket.emit('remove nickname', localStorage.getItem("nickname"));



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
    item.innerHTML = `<b>${msg.nickname}</b>: <i>${getCurrentTime()}</i> <br> ${msg.message}`
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

socket.on("user disconnected", (nickname) => {
    // COMMENT: The hosting website messes this up... Commented for now
    // const li = document.createElement("li");
    // li.textContent = `${nickname} has disconnected...`; // Commented for hosting purposes....
    // messages.appendChild(li);
    // [...document.querySelector(".nicknames").children].forEach((val) => {
    //     if (val.textContent.toLowerCase() === nickname.toLowerCase()) {
    //         val.className = "offline";
    //     }
    // }) 
});
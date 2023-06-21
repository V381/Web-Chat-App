const socket = io();
const messages = document.querySelector(".messages");
const form = document.getElementById('form');
const input = document.getElementById('input');

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

socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = `${msg.nickname}: ${msg.message}`
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user disconected", (msg) => {
    const item = document.createElement('li');
    item.textContent = "User Disconected";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
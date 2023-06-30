
const socket = io();

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

export function userIsTyping() {
    const messageInput = document.querySelector('.message-input');
    const debounceDelay = 500;
    let typingTimeout = null; 
    const emitUserTyping = debounce(() => {
        socket.emit('user typing', localStorage.getItem("nickname"));
    }, debounceDelay);
    messageInput.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        emitUserTyping();
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          const typingMessage = document.querySelector('.typing-message');
          typingMessage.textContent = '';
        }, debounceDelay);
        emitUserTyping();
    });
}
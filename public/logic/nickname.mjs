export function setNickname() {
    const socket = io();
    if (localStorage.getItem("nickname") !== null) {
      if (localStorage.getItem("nickname").length > 0) return;
    }
    let setNickname = String(prompt("What is your nickname?"));

    if (setNickname.length > 10) {
      setNickname = String(prompt("What is your nickname?"));
    }

    socket.emit('set nickname', setNickname);
    (async () => {
      fetch('/set-nickname', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({nickname: setNickname})
      });
    })();
    localStorage.setItem("nickname", setNickname);
}
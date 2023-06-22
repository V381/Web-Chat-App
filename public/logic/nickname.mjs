import { waitForCondition } from "./custom-prompt.mjs";

export function setNickname() {
    const socket = io();
    if (localStorage.getItem("nickname") !== null) {
      document.querySelector(".backdrop").className = "";
      document.querySelector(".custom-prompt").parentNode.removeChild( document.querySelector(".custom-prompt"))
      return;
    }
    waitForCondition().then((setNickname) => {
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
      document.querySelector(".backdrop").className = "";
    });
}
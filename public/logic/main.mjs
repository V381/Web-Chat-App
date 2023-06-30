import { setNickname } from "./nickname.mjs";
import { togglePanel, seeWhoIsOnline } from "./online-panel.mjs";
import { userIsTyping } from "./user-is-typing.mjs";

(() => {
    localStorage.clear();
    setNickname();
    togglePanel();
    seeWhoIsOnline();
    userIsTyping();
})();
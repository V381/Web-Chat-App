import { setNickname } from "./nickname.mjs";
import { togglePanel, seeWhoIsOnline } from "./online-panel.mjs";
import { userIsTyping } from "./user-is-typing.mjs";

(() => {
    setNickname();
    togglePanel();
    seeWhoIsOnline();
    userIsTyping();
})();
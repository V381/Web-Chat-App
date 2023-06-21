import { setNickname } from "./nickname.mjs";
import { togglePanel, seeWhoIsOnline } from "./online-panel.mjs";

(() => {
    setNickname();
    togglePanel();
    seeWhoIsOnline();
})();
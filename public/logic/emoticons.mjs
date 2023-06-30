function emoticons() {
    const emoticons = [
        { name: 'smile', code: ':)', emoticon: "🙂"},
        { name: 'laugh', code: ':D', emoticon: "😁"},
        { name: 'heart', code: '<3', emoticon: "❤️‍🔥" },
        { name: "plezz", code: ":p", emoticon: "😋"},
        { name: "kiss", code: ":*", emoticon: "😚"},
        { name: "devil", code: "3:", emoticon: "😈"},
        { name: "ghost", code: ":g", emoticon: "👻"},
        { name: "glasses", code: ":B", emoticon: "😎"}
    ];
    return emoticons;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceEmoticonCodesWithEmoticons(message) {
    emoticons().forEach((emoticon) => {
      const escapedCode = escapeRegExp(emoticon.code);
      const regex = new RegExp(escapedCode, 'g');
      message = message.replace(regex, emoticon.emoticon);
    });
    return message;
  }
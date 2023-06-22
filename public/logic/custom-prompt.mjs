export function waitForCondition(input = "") {
    const customPrompt = document.getElementById("custom-prompt");
    const customInput = document.getElementById("custom-input");
    const customButton = document.getElementById("custom-button");
  
    return new Promise((resolve) => {
      function handleButtonClick() {
        const inputValue = customInput.value.trim();  
        if (inputValue.length < 20 && inputValue.length !== 0) {
          customPrompt.removeEventListener("click", handleClickOutside);
          document.removeEventListener("click", handleClickOutside);
          customPrompt.style.display = "none";
          resolve(inputValue);
        } else {
          alert("Nickname is either empty or has more than 20 characters. Try again!");
        }
      }
  
      function handleClickOutside(event) {
        if (!customPrompt.contains(event.target)) {
          event.stopPropagation();
        }
      }
  
      customButton.addEventListener("click", handleButtonClick);
      customPrompt.addEventListener("click", handleClickOutside);
      document.addEventListener("click", handleClickOutside);
    });
  }
  
  window.addEventListener("load", () => {
    const customPrompt = document.getElementById("custom-prompt");
    if (customPrompt !== null) {
        customPrompt.style.display = "block";
    }
  });

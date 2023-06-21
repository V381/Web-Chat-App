export function togglePanel() {

        const leftPanel = document.querySelector('.left-panel');
        const rightContent = document.querySelector('.right-panel');

        leftPanel.addEventListener('click', function() {
        leftPanel.classList.toggle('expanded');
        rightContent.classList.toggle('pushed');
    });
}

export function seeWhoIsOnline() {
    const nicknamePanel = document.querySelector('.nicknames');
    fetch('/connections')
    .then(response => response.json())
    .then(data => {
        data.connections.map(val => {
            const li = document.createElement("li");
            li.textContent = val.nickname;
            nicknamePanel.appendChild(li);
        })
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}
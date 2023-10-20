const emojis = ["🤣","🤡", "🛠️", "🍆","🎃","😏","😍","🤬","❤️"];

function createRandomEmoji() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.position = "absolute";
    span.style.fontSize = `${Math.random() * 2 + 1}rem`;
    span.style.left = `${Math.random() * 100}vw`;
    span.style.top = `${Math.random() * 100}vh`;
    span.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;

    return span;
}

document.addEventListener("DOMContentLoaded", function () {
    const emojiBackground = document.querySelector(".emoji-background");
    for (let i = 0; i < 50; i++) {
        emojiBackground.appendChild(createRandomEmoji());
    }
});

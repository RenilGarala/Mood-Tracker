const emojis = document.querySelectorAll(".emoji");

emojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
        const emojiIcon = emoji.innerText;
        setMood(emojiIcon);
    });
});

function setMood(emoji) {
    const emojiName = getEmojiName(emoji);

    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const moods = JSON.parse(localStorage.getItem("moods")) || [];

    moods.push({
        emoji: emojiName,
        date: currentDate,
        time: currentTime
    });
    
    localStorage.setItem("moods", JSON.stringify(moods));
    displayMoods();
}

function displayMoods() {
    const moodList = document.querySelector('.mood-list');
    moodList.innerHTML = '';

    const moods = JSON.parse(localStorage.getItem("moods")) || [];

    moods.forEach((mood) => {
        const moodData = document.createElement('div');
        moodData.classList.add('mood');
        moodData.innerHTML = `
            <div class="mood-name">${mood.emoji}</div>
            <div class="left-mood">
                <div class="mood-date">${mood.date}</div>
                <div class="mood-time">${mood.time}</div>
            </div>
        `;
        moodList.appendChild(moodData);
    });
}

function getEmojiName(emoji) {
    switch (emoji) {
        case '😀': return "😀 Happy";
        case '🥰': return "🥰 Romantic";
        case '🥱': return "🥱 Boring";
        case '😔': return "😔 Sad";
        case '😠': return "😠 Angry";
        default: return null;
    }
}
document.addEventListener("DOMContentLoaded", displayMoods);
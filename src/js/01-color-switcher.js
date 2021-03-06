const ref = {
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
}
const PROMPT_DELAY = 1000;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

ref.startBtn.addEventListener('click', () => {
    ref.startBtn.setAttribute("disabled", true)
    onClickStart = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, PROMPT_DELAY)
}),
    ref.stopBtn.addEventListener('click', () => {
        clearInterval(onClickStart),
            ref.startBtn.removeAttribute("disabled")
    })


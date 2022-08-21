function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
  
// 1. відкриваємо достум до кнопок і боді!!!
const body = document.querySelector("body");
const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

// 2. Оголошуємо змінну таймера!
let timerId = null;

// 3. Встановлюємо початкове значення кнопки Стоп!
btnStop.disabled = true;

// 4. Прослуховуємо кнопки!!
btnStart.addEventListener("click",onStart);
btnStop.addEventListener("click", onStop);

// 5. Запускаємо зміну кольорів
function onStart () {
    btnStart.disabled = true,
    btnStop.disabled = false,
    timerId = setInterval(() => {
    body.style.background = getRandomHexColor()
    },1000)
};

// 6. Зупиняємо зміну кольорів
function onStop(){
    if(timerId) {
        clearInterval(timerId);
    btnStart.disabled = false
    btnStop.disabled = true
    }
    return
};



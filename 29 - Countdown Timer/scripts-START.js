let countdown;
const buttons = document.querySelectorAll('[data-time');
const timerDisplay = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');

const timer = seconds => {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now(); //ms
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //stop timer  when it reaches zero
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display
        displayTimeLeft(secondsLeft);
    }, 1000);
}

const displayTimeLeft = seconds => {
    const minutes = Math.floor(seconds / 60); 
    const secondsLeft = seconds % 60;
    
    const display = `${minutes}:${secondsLeft < 10 ? '0' : '' }${secondsLeft}`;
    document.title = display;
    timerDisplay.textContent = display;
}

const displayEndTime = timestamp => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour-12 : hour;

    timeEnd.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const startTimer = ({ target }) => {
    const seconds = parseInt(target.dataset.time);
    timer(seconds);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = e.target.minutes.value;
    timer(mins * 60);
    e.target.reset();
});
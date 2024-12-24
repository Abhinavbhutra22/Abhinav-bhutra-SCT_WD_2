let timerInterval;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');


function startStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        pauseButton.disabled = true;
        lapButton.disabled = true;
    } else {
        timerInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
    isRunning = !isRunning;
}


function updateTime() {
    elapsedTime += 10;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    timeDisplay.textContent = formatTime(minutes, seconds, milliseconds);
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Resume';
    pauseButton.disabled = true;
    lapButton.disabled = true;
    isRunning = false;
}
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapTimes = [];
    timeDisplay.textContent = '00:00.00';
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
    pauseButton.disabled = true;
    lapButton.disabled = true;
    isRunning = false;
}

function recordLap() {
    const lapTime = formatTime(
        Math.floor(elapsedTime / 60000),
        Math.floor((elapsedTime % 60000) / 1000),
        elapsedTime % 1000
    );
    lapTimes.push(lapTime);

    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
}


function formatTime(minutes, seconds, milliseconds) {
    return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

function padZero(value, length = 2) {
    return value.toString().padStart(length, '0');
}

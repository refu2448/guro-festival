// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const recordList = document.getElementById('recordList');

function timeToString(time) {
  let totalSeconds = Math.floor(time / 1000);
  let hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  let minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  let seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return; // 이미 타이머가 동작 중이면 무시
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = timeToString(elapsedTime);
  }, 1000);
}

function stopTimer() {
  if (!timerInterval) return; // 타이머가 동작 중이 아니면 무시
  clearInterval(timerInterval);
  timerInterval = null;
  // 기록 저장
  const newRecord = document.createElement('li');
  newRecord.textContent = timeToString(elapsedTime);
  recordList.appendChild(newRecord);
  // 초기화
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

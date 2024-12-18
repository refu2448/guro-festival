// script.js

let userName = '';
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const recordList = document.getElementById('recordList');
const nameInputSection = document.getElementById('nameInputSection');
const timerSection = document.getElementById('timerSection');

// 사용자 이름 제출 버튼 이벤트 추가
document.getElementById('submitName').addEventListener('click', () => {
  const nameInput = document.getElementById('username').value.trim();
  if (nameInput) {
    userName = nameInput;
    // 이름 입력 섹션 숨기기
    nameInputSection.style.display = 'none';
    // 타이머 섹션 표시
    timerSection.style.display = 'block';
    // 타이머 시작
    startTimer();
  } else {
    alert('이름을 입력해주세요.');
  }
});

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
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = timeToString(elapsedTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  // 기록 저장 시 사용자 이름과 함께 추가
  const newRecord = document.createElement('li');
  newRecord.textContent = `${userName}: ${timeToString(elapsedTime)}`;
  recordList.appendChild(newRecord);
  // 초기화
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
  // 타이머 섹션 숨기기 (선택 사항)
  timerSection.style.display = 'none';
  // 필요 시 이름 입력 섹션 다시 표시
  nameInputSection.style.display = 'block';
  document.getElementById('username').value = '';
}

document.getElementById('stopButton').addEventListener('click', stopTimer);

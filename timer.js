// timer.js

// URL에서 쿼리 파라미터 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// `userName`을 URL에서 가져온 사용자 이름으로 설정
let userName = getQueryParam('user') || 'Unknown User';

// 타이머 관련 변수
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const recordList = document.getElementById('recordList');

// 시간 포맷 함수
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

// 타이머 시작 함수
function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = timeToString(elapsedTime);
  }, 1000);
}

// 타이머 정지 함수
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
  // 타이머 재시작 (선택 사항)
  startTimer();
}

// 페이지 로드 시 타이머 자동 시작
window.onload = startTimer;

// 정지 버튼 이벤트 리스너 추가
document.getElementById('stopButton').addEventListener('click', stopTimer);
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

// DOM 요소 가져오기
const timerDisplay = document.getElementById('timer');
const recordList = document.getElementById('recordList');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

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
}

// 타이머 리셋 함수
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
  recordList.innerHTML = ''; // 모든 기록 삭제 (선택 사항)
  startTimer(); // 타이머 재시작 (필요 시)
}

// 페이지 로드 시 타이머 자동 시작
window.onload = startTimer;

// 버튼 이벤트 리스너 추가
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// timer.js - 이름 입력 시 HTML 이스케이프 처리 추가

// 이름 입력 시 안전하게 처리
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// 이름 입력 제출 시 에스케이프 처리
document.getElementById('submitName').addEventListener('click', () => {
  let nameInput = document.getElementById('username').value.trim();
  if (nameInput) {
    nameInput = escapeHTML(nameInput);
    window.location.href = `timer.html?user=${encodeURIComponent(nameInput)}`;
  } else {
    alert('이름을 입력해주세요.');
  }
});

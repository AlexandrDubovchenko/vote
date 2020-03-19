const $voteForm = document.querySelector('.vote');
const $members = document.querySelectorAll('[name = "radios"]');
const $vote = document.getElementById('vote');
const $btnExit = document.getElementById('btnExit');
const $exitLink = document.getElementById('exit');
const $timer = document.querySelector('.timer');
const $revote = document.querySelector('#revote')
let timeStart = null;

getIsFinish($voteForm); 

 if (getCookie('voted')) {
  $members.forEach(member => member.disabled = true);
  $vote.disabled = true;
 }
timerWork('/vote/time', $timer);


$voteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $vote.disabled = true;
  setVotedTrue();
  sendVote('/voted', $voteForm);
  $members.forEach(member => member.disabled = true);
})

$btnExit.addEventListener('click', () => {
  deleteCookie('password');
  $exitLink.click();
});

$revote.addEventListener('click', ()=>{
  $members.forEach(member => member.removeAttribute('disabled'));
  $vote.removeAttribute('disabled')
  sendVote('/revote', $voteForm);
})















function toResult(res, $voteForm) {
  if (res) {
    $voteForm.action = '/resultusers';
    $voteForm.submit();
  }
}

function getIsFinish($voteForm) {
  fetch('/isfinished', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((res)=>{
    toResult(res, $voteForm)
  })
}

function timerWork(url, $timer){
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()).then(res => {
    timeStart = +res;
    $timer.textContent = timeFormatted('mm:ss', getTimeLeft(timeStart ,60));
    timerStart(timeStart)
  });
}


function timerStart(timeStart) {
  let timeLeft = getTimeLeft(timeStart, 60); 
  return function timerCount() {
      const timer = setTimeout(timerCount, 1000)
      if (timeLeft >= 0) {
        const formatted = timeFormatted('mm:ss', timeLeft);
        $timer.textContent = formatted;
        --timeLeft;
      } else {
        timerStop(timer, $timer);
      }
  }()
}
function timerStop(timer, $timer) {
  clearTimeout(timer);
        timeLeft = 0;
        const formatted = timeFormatted('mm:ss' ,timeLeft);
        $timer.textContent = formatted;   
        getIsFinish($voteForm);
}

function getTimeLeft(timeStart ,deadline) {
  let timeLeft = 0;
  if (timeStart !== 0) {
    return timeLeft = deadline - (+moment().format('X') - timeStart);
  } else {
    return timeLeft;
  }
}

function setVotedTrue() {
  fetch('/vote/time', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()).then(res => {
    timeStart = +res;
    setCookie('voted', true, {'max-age': getTimeLeft(timeStart, 60)})
  });
}

function sendVote(url, $voteForm) {
  const voteFormData = new FormData($voteForm);
  const vote = formDataToObj(voteFormData);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote),
  }).then();
}

function timeFormatted(format, timeLeft){
  return moment.utc(timeLeft * 1000).format(format)
}

function formDataToObj(FormData) {
  const FormDataObj = {};
  FormData.forEach((value, key) => FormDataObj[key] = value);
  return FormDataObj
}
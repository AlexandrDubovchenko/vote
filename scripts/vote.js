const $voteForm = document.querySelector('.vote');
const $members = document.querySelectorAll('[name = "radios"]');
const $vote = document.getElementById('vote');
const $btnExit = document.getElementById('btnExit');
const $exitLink = document.getElementById('exit');
const $timer = document.querySelector('.timer');
const $revote = document.querySelector('#revote')
let timeStart = null;
let deadline

getIsFinish($voteForm);

getIsVote($vote);
if (getCookie('voted')) {
  $members.forEach(member => member.disabled = true);
  toggle($vote, $revote);
}
timerWork('/vote/time', $timer);

if (getCookie('chose')) {
  document.querySelector(`[value="${getCookie('chose')}"]`).checked = true;
}


$voteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  toggle($vote, $revote);
  setVotedTrue();
  sendVote('/voted', $voteForm, true);
  $members.forEach(member => member.disabled = true);
})

$btnExit.addEventListener('click', () => {
  deleteCookie('password');
  $exitLink.click();
});

$revote.addEventListener('click', () => {

  $members.forEach(member => member.removeAttribute('disabled'));
  toggle($revote, $vote)
  sendVote('/revote', $voteForm);
})








function toggle(clicked, hidden) {
  hidden.removeAttribute('disabled');
  hidden.removeAttribute('hidden');
  clicked.hidden = true;
  clicked.disabled = true;
}






function toResult(res, $voteForm) {

  if (res) {
    deleteCookie('chose')
    $voteForm.action = '/result';
    $voteForm.submit();
  } 
  
}

function getIsFinish($voteForm) {
  fetch('/isfinished', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((res) => {
    toResult(res, $voteForm)
  })
};

function getIsVote(button) {
  fetch('/isVote', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((res) => {
    if (!res) {
      button.disabled = true;
    }
  })
}

function timerWork(url, $timer) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()).then(res => {
    timeStart = +res.timeStart;
    deadline = +res.deadline;



    $timer.textContent = timeFormatted('mm:ss', getTimeLeft(timeStart, deadline));
    timerStart(timeStart, deadline)
  });
}


function timerStart(timeStart, deadline) {
  let timeLeft = getTimeLeft(timeStart, deadline);
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
  const formatted = timeFormatted('mm:ss', timeLeft);
  $timer.textContent = formatted;
  getIsFinish($voteForm);
}

function getTimeLeft(timeStart, deadline) {
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
    timeStart = +res.timeStart;
    setCookie('voted', true, { 'max-age': getTimeLeft(timeStart, deadline) })
  });
}

function sendVote(url, $voteForm, boolean) {
  const voteFormData = new FormData($voteForm);
  const vote = formDataToObj(voteFormData);


  if (boolean) {
    deleteCookie('chose');
    setCookie('chose', vote.radios, {

      'max-age': getTimeLeft(timeStart, deadline),
    })
  }

  if (Object.keys(vote).length > 0) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vote),
    }).then();
  }


}

function timeFormatted(format, timeLeft) {
  return moment.utc(timeLeft * 1000).format(format)
}

function formDataToObj(FormData) {
  const FormDataObj = {};
  FormData.forEach((value, key) => FormDataObj[key] = value);
  return FormDataObj
}

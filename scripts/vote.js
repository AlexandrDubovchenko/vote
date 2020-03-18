const $voteForm = document.querySelector('.vote');
$vote = document.getElementById('vote');
const $btnExit = document.getElementById('btnExit');
const $exitLink = document.getElementById('exit');
const $timer = document.querySelector('.timer');
let timeStart = null;




getIsFinish($voteForm);

 if (getCookie('voted')) {
  $vote.disabled = true;
 }

fetch('/vote/time', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(res => res.json()).then(res => {
  timeStart = +res;
  $timer.textContent = getTimeLeft(timeStart ,60);
  timerStart(timeStart)
});

$voteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $vote.disabled = true;
  const voteFormData = new FormData($voteForm);
  const vote = formDataToObj(voteFormData);
  

  setVotedTrue();
  sendVote(vote);
})

$btnExit.addEventListener('click', (e) => {
  deleteCookie('password');
  $exitLink.click();
});

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



function formDataToObj(FormData) {
  const FormDataObj = {};
  FormData.forEach((value, key) => FormDataObj[key] = value);
  return FormDataObj
}

function timerStart(timeStart) {
  let timeLeft = getTimeLeft(timeStart, 60); 
  return function timerCount() {
    const timer = setTimeout(() => {
      getIsFinish($voteForm); 
      if (timeLeft > 0) {
        const formatted = moment.utc(timeLeft * 1000).format('mm:ss');
        $timer.textContent = formatted;
        --timeLeft;
      } else {
        clearTimeout(timer);
        timeLeft = 0;
        const formatted = moment.utc(timeLeft * 1000).format('mm:ss');
        $timer.textContent = formatted;   
            
      }
      setTimeout(timerCount, 1000)
    }, 0)
  }()
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

function sendVote(vote) {
  fetch('/voted', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote),
  }).then();
}
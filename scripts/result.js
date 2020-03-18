const $btnCreate = document.getElementById('btnCreate');
const $createForm = document.getElementById('createForm');
const $btnExit = document.getElementById('btnExit');
const exitLink = document.getElementById('exit');

const $btnStop = document.getElementById('btnStop');
const $finishForm = document.getElementById('finishForm');




$btnCreate.addEventListener('click', () => {
  $createForm.submit();
})


$btnExit.addEventListener('click', () => {
  deleteCookie('passwordAdmin');
  deleteCookie('password');
  exitLink.click();
});


$btnStop.addEventListener('click', () => {
  fetch('/finish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
})


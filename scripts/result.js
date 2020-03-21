const $control = document.querySelector('.control');
const $createForm = document.getElementById('createForm');
const $finishForm = document.getElementById('finishForm');

if (getCookie('passwordAdmin')) {
  $control.innerHTML += 
  `
  <button type="button" class="btncontainer" id="btnStop" } %> ><div class="btnbutton sndbtn">Завершить</div></button>
  <button type="button" class="btncontainer" id="btnCreate" } %> ><div class="btnbutton">Создать новое</div></button>
  <button type="button" class="btncontainer" id="btnExit"><div class="btnbutton" ><a id="exit" href="/">Выйти</a></div> </button>
  `;
  const $btnCreate = document.getElementById('btnCreate');
  const $btnStop = document.getElementById('btnStop');
 
  $btnCreate.addEventListener('click', () => {
    $createForm.submit();
  });
  $btnStop.addEventListener('click', () => {
    $finishForm.submit()
  });

} else{
  $control.innerHTML += `<button type="button" class="btncontainer" id="btnExit"><div class="btnbutton" ><a id="exit" href="/">Выйти</a></div> </button>`
}


const $btnExit = document.getElementById('btnExit');
const exitLink = document.getElementById('exit');

$btnExit.addEventListener('click', () => { 
  deleteCookie('passwordAdmin');
  deleteCookie('password');
  exitLink.click();
});





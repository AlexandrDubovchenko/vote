const $btnExit = document.getElementById('btnExit');
const exitLink = document.getElementById('exit');







$btnExit.addEventListener('click', () => {
  deleteCookie('passwordAdmin');
  deleteCookie('password');
  exitLink.click();
});



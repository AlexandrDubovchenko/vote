const $btnCreate = document.getElementById('btnCreate');
const $createForm = document.getElementById('createForm');
const $btnExit = document.getElementById('btnExit');
const exitLink = document.getElementById('exit');
$btnCreate.addEventListener('click', (e)=>{
    $createForm.submit();
})


$btnExit.addEventListener('click', (e) => {    
    deleteCookie('passwordAdmin');
    exitLink.click();
});





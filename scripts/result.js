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


function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }
  function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

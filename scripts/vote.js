const $voteForm = document.querySelector('.vote');
const $btnExit = document.getElementById('btnExit');
const $exitLink = document.getElementById('exit');
const vote ={};

$voteForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const voteFormData = new FormData($voteForm);
    voteFormData.forEach((value, key) => vote[key] = value);
    
    
    fetch('/voted', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vote),
    }).then();
})

$btnExit.addEventListener('click', (e) => {    
    console.log('click');
    
    deleteCookie('password');
    $exitLink.click();
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

const $authForm = document.querySelector('.authorization');
const $inputPassword = document.getElementById('inputPassword');
$inputPassword.value = getCookie('passwordAdmin') || getCookie('password');
let accessTry = 0;
const authFormData = new FormData($authForm);
const password = formDataToObj(authFormData);
fetch('/authorization', {
    method: 'POST',
    body: JSON.stringify(password),
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(res => {
        passwordCheck(res)
    })




$authForm.addEventListener('submit', e => {
    
    accessTry++;
    e.preventDefault();
    const authFormData = new FormData($authForm);
    const password = formDataToObj(authFormData);
    fetch('/authorization', {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            passwordCheck(res)
        });
});


function formDataToObj(FormData) {
    const FormDataObj = {};
    FormData.forEach((value, key) => FormDataObj[key] = value);
    return FormDataObj
}

function passwordCheck(res) {
    
    if (res.authorize) {
        setCookie('password', $inputPassword.value, options = {});
        $authForm.action = '/vote';
        $authForm.submit();
    } else if (res.authorizeAdmin) {
        setCookie('passwordAdmin', $inputPassword.value, options = {});
        $authForm.action = '/admin';
        $authForm.submit();
    }
    else {
       
        console.log(accessTry);
        
        if (accessTry > 0) {
            const title = document.querySelector('h3');
            title.textContent = 'Попробуйте еще раз';
            title.style.color = 'red';
        }

    }
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


  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }
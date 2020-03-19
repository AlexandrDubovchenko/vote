const $authForm = document.querySelector('.authorization');
const $inputPassword = document.getElementById('inputPassword');
const title = document.querySelector('h3');
$inputPassword.value = getCookie('passwordAdmin') || getCookie('password');


let accessTry = 0;
sendPassword($authForm)






$authForm.addEventListener('submit', e => {
    
    accessTry++;
    e.preventDefault();
    sendPassword($authForm);
    
});



function sendPassword($authForm) {
    const authFormData = new FormData($authForm);
    const authFormObj = formDataToObj(authFormData);
    fetch('/authorization', {
        method: 'POST',
        body: JSON.stringify(authFormObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            passwordCheck(res, $authForm, $inputPassword.value, title);
        });
}

function passwordCheck(res, $authForm, password, title) {
    
    if (res.authorize) {
        giveAccess($authForm, password)
    } else if (res.authorizeAdmin) {
        setCookie('passwordAdmin', password, options = {'expires': new Date(Date.now() + 8600e3)});
        getIsVote($authForm);
    }
    else {       
        if (accessTry > 0) { 
           showWrong(title)
        }

    }
}


function getIsVote($authForm) {
    fetch('/admin/isvote', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=> res.json()).then(res =>{
        
        
        if (res) {

            $authForm.action = '/result';
            $authForm.submit();
            
        } else {
            $authForm.action = '/admin';
            $authForm.submit();
        }
    
    });
}

function giveAccess($authForm, password) {
    setCookie('password', password, options = {'expires': new Date(Date.now() + 8600e3)});
    $authForm.action = '/vote';
    $authForm.submit();
}

function  showWrong(title) {
    title.style.color = 'red';
    title.textContent = 'Неверный пароль' ;
}


function formDataToObj(FormData) {
    const FormDataObj = {};
    FormData.forEach((value, key) => FormDataObj[key] = value);
    return FormDataObj
}
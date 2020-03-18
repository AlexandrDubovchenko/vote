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
       
        setCookie('password', $inputPassword.value, options = {'expires': new Date(Date.now() + 8600e3)});
        $authForm.action = '/vote';
        $authForm.submit();
    } else if (res.authorizeAdmin) {
        setCookie('passwordAdmin', $inputPassword.value, options = {'expires': new Date(Date.now() + 8600e3)});
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



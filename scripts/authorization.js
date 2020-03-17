const $authForm = document.querySelector('.authorization');
const $inputPassword = document.getElementById('inputPassword');
$inputPassword.value = localStorage.getItem('passwordAdmin') || localStorage.getItem('password');
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
        localStorage.setItem('password', $inputPassword.value)
        $authForm.action = '/vote'
        $authForm.submit()
    } else if (res.authorizeAdmin) {
        localStorage.setItem('passwordAdmin', $inputPassword.value)
        $authForm.action = '/admin';
        $authForm.submit()
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
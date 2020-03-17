const $authForm = document.querySelector('.authorization');
const password = {};

const $inputPassword = document.getElementById('inputPassword');
$inputPassword.value = localStorage.getItem('passwordAdmin') || localStorage.getItem('password')

$authForm.addEventListener('submit', e => {
    e.preventDefault();
    const authFormData = new FormData($authForm);
    authFormData.forEach((value, key) => password[key] = value)
    fetch('/authorization', {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.authorize) {
                localStorage.setItem('password', $inputPassword.value)
                $authForm.action = '/vote'
               $authForm.submit()
                }else if(res.authorizeAdmin){
                    localStorage.setItem('passwordAdmin', $inputPassword.value)
                    $authForm.action = '/admin';
                    $authForm.submit() }
                else {
                alert('Неверный пароль')
            }
        })
})
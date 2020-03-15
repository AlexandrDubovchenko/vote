const $authForm = document.querySelector('.authorization');
const password = {};
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
                $authForm.action = '/vote'
               $authForm.submit()
                }else if(res.authorizeAdmin){
                    $authForm.action = '/admin';
                    $authForm.submit() }
                else {
                alert('Неверный пароль')
            }
        })
})
const $formAdmin = document.querySelector('.admin');
const $add = document.querySelector('.add');
const members = [];




$formAdmin.addEventListener('submit', (e)=>{   
    e.preventDefault()
    const adminData = {
        members: members,
        timeStart: +moment().format('X'),
    }
   fetch('/create', {
    method: 'POST', 
    body: JSON.stringify(adminData),
    headers: {
      'Content-Type': 'application/json'
    }
   }).then($formAdmin.submit())
});
$add.addEventListener('click', ()=>{
    const formData = new FormData($formAdmin);
    formData.forEach(value=>{
        members.push(value)
        render(document.querySelector('.members'), value);
    });
    document.querySelector('[name="member"]').value='';      
});

function render(parent, content){
    const $li = document.createElement('li');
    $li.textContent =  content;
    parent.append($li);
}



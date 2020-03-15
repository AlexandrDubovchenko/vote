const $formAdmin = document.querySelector('.admin');
const $add = document.querySelector('.add');
const members = [];



$formAdmin.addEventListener('submit', (e)=>{   
    e.preventDefault()
   fetch('/create', {
    method: 'POST', 
    body: JSON.stringify(members),
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



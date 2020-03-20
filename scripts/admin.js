const $formAdmin = document.querySelector('.admin');
const $add = document.querySelector('.add');
const members = [];


$formAdmin.addEventListener('submit', (e)=>{   
    e.preventDefault()
    createVote($formAdmin, members);
});
$add.addEventListener('click', ()=>{
    addMember($formAdmin, members)
    document.querySelector('[name="member"]').value='';      
});











function render(parent, content){
    const $li = document.createElement('li');
    $li.textContent =  content;
    parent.append($li);
}

function addMember($formAdmin, members){
    const formData = new FormData($formAdmin);
    formData.forEach(value=>{
        if (value !== '') {
            members.push(value)
            render(document.querySelector('.members'), value);
        }
console.log(members);

    });
}

function createVote($formAdmin, members){
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
}


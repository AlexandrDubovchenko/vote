const $formAdmin = document.querySelector('.admin');
const $add = document.querySelector('.add');
const $btnExit = document.querySelector('#btnExit');
const $exitLink = document.querySelector('#exit');

const members = [];

$btnExit.addEventListener('click', () => {
    deleteCookie('passwordAdmin');
    $exitLink.click();
  });


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
        
        
        if (value.split(' ').filter((el)=> el !== '').length > 0 ){
            members.push(value)
            render(document.querySelector('.members'), value);
        }


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


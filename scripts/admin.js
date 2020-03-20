const $formAdmin = document.querySelector('.admin');
const $add = document.querySelector('.add');
const $btnExit = document.querySelector('#btnExit');
const $exitLink = document.querySelector('#exit');

let formData = new FormData($formAdmin);
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
    formData = new FormData($formAdmin);
    const memberInput =  formDataToObj(formData).member;
        if (memberInput.split(' ').filter((el)=> el !== '').length > 0 ){
            members.push(memberInput)
            render(document.querySelector('.members'), memberInput);
        }


    };

function createVote($formAdmin, members){
    if (members.length > 0) {
        formData = new FormData($formAdmin)
    const password = formDataToObj(formData).password;
    const appt = formDataToObj(formData).appt;
    const deadline = {
        minutes : +appt.split(':')[0],
        seconds : +appt.split(':')[1],
        get deadlineSeconds() {
            return this.minutes*60 + this.seconds;
        },
    };
    const adminData = {
        members: members,
        timeStart: +moment().format('X'),
        password: password,
        deadline : deadline.deadlineSeconds 
        
    }

   fetch('/create', {
    method: 'POST', 
    body: JSON.stringify(adminData),
    headers: {
      'Content-Type': 'application/json'
    }
   }).then($formAdmin.submit())
    }
    
}




function formDataToObj(FormData) {
    const FormDataObj = {};
    FormData.forEach((value, key) => FormDataObj[key] = value);
    return FormDataObj
  }
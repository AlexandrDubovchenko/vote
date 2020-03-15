const $voteForm = document.querySelector('.vote');
const vote ={};

$voteForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const voteFormData = new FormData($voteForm);
    voteFormData.forEach((value, key) => vote[key] = value);
    console.log(vote);
    
    fetch('/voted', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vote),
    }).then();
})

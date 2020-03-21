const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


let password = '12345';
let members = [];
let membersRes = {};
let votes = 0;
let isVote = false;
let isFinished = false;
let deadline = 0;

const adminPassword = 'admin';
let timeStart = null;


function finishVote(timeout) {
    setTimeout(() => {
        
        
        isFinished = true;
    }, timeout*1000);
}

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const urlencodedJson = bodyParser.json({ extended: false });
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.redirect('authorization');
})

app.get('/authorization', (req, res) => {
    res.render('authorization');
})

app.get('/admin', (req, res) => res.redirect('authorization'));

app.get('/admin/isvote', urlencodedJson, function(req, res, next) {
    res.send(isVote);
});
app.get('/isfinished', urlencodedJson, (req, res) => res.send(isFinished));

app.get('/isvote', urlencodedJson, (req, res) => res.send(isVote));

app.get('/vote/time', urlencodedJson, (req, res) => {
     const time = {
        timeStart: timeStart,
        deadline: deadline,
     }
     res.send(JSON.stringify(time)) 
    })

app.post('/admin', urlencodedJson, function(req, res, next) {

    res.render('admin');
    res.end();
})


app.post('/authorization', urlencodedJson, function(req, res, next) {    
    if (password === req.body.password) {
        res.send(JSON.stringify({ 'authorize': true }))
    } else if (adminPassword === req.body.password) {
        res.send(JSON.stringify({ 'authorizeAdmin': true }))
    } else {
        res.send(JSON.stringify({ 'authorize': false }));
    }
    res.end();
});

app.post('/vote', urlencodedParser, (req, res) => {
    res.render('vote', { members: members, votes: votes });
    
});


app.post('/result', urlencodedJson, function(req, res, next) {
    const membersResSort =  Object.entries(membersRes).sort((a, b)=>{
        return b[1] - a[1]
    });
  

   
    
    res.render('result', { membersRes: membersResSort, votes: votes, });
    res.end();
});
app.post('/resultusers', urlencodedJson, function(req, res, next) {
    const membersResSort =  Object.entries(membersRes).sort((a, b)=>{
        return b[1] - a[1]
    });
  
    console.log( membersRes);
    
   
    
    res.render('resultusers', { membersRes: membersResSort, votes: votes, });
    res.end();
});
app.post('/revote', urlencodedJson, (req, res)=>{
    if (membersRes[req.body.radios] > 0 ) {
        membersRes[req.body.radios]--;
    }
    if (votes > 0) {
        votes--;
    }
    console.log(membersRes);
    console.log(req.body.radios);
    res.end();
});
app.post('/voted', urlencodedJson, function(req, res) {
    membersRes[req.body.radios]++;
    console.log(membersRes);
    console.log(req.body.radios);
    votes++;
    res.end();
})
app.post('/newvote', (req, res) => {
    members = [];
    membersRes = {};
    isVote = false;
    res.redirect('admin')
})
app.post('/create', urlencodedJson, (req, res) => {
    isFinished = false;
    isVote = true;
    req.body.members.forEach(member => members.push(member.split(' ').join('_')));    
    members.forEach(member => membersRes[member] = 0);
    timeStart = req.body.timeStart;
    password = req.body.password;
    deadline = req.body.deadline;
    finishVote(deadline);  

});
app.post('/finish', (req, res) => {
    isVote = false;
    isFinished = true;
    members = [];
})



app.listen(3000, () => console.log('server start'));
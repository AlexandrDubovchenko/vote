const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


const password = '12345';
let members = [];
let membersRes = {};
let votes = 0;
let isVote = false;
let isFinished = false;


const adminPassword = 'admin';
let timeStart = null;


async function finishVote() {
    setTimeout(() => {

        isFinished = true;
    }, 60000);
}

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const urlencodedJson = bodyParser.json({ extended: false });
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/fonts', express.static(__dirname + '/fonts'));
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

app.get('/vote/time', urlencodedJson, (req, res) => { res.send(JSON.stringify(timeStart)) })

app.post('/admin', urlencodedJson, function(req, res, next) {

    res.render('admin');
    res.end();
})


app.post('/authorization', urlencodedJson, function(req, res, next) {
    console.log(req.body);
    
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
    res.render('result', { membersRes: membersRes, votes: votes, });
    res.end();
});
app.post('/resultusers', urlencodedJson, function(req, res, next) {
    res.render('resultusers', { membersRes: membersRes, votes: votes, });
});
app.post('/revote', urlencodedJson, (req, res)=>{
    membersRes[req.body.radios]--;
    console.log(membersRes);
    console.log(req.body.radios);
    votes--;
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
    req.body.members.forEach(member => members.push(member));
    members.forEach(member => membersRes[member] = 0);
    timeStart = req.body.timeStart;
    finishVote();

});
app.post('/finish', (req, res) => {
    isVote = false;
    members = [];
    membersRes = {};
})



app.listen(3000, () => console.log('server start'));
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


const password = '12345';
let members = [];
let membersRes = {};
let isVote = false;
const adminPassword = 'admin';
let timeStart = null;




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



app.post('/admin', urlencodedJson, function(req, res, next) {

    res.render('admin')
    res.end();
})

app.post('/authorization', urlencodedJson, function(req, res, next) {
    console.log(req.body.password);

    if (password === req.body.password) {
        res.send(JSON.stringify({ 'authorize': true }))
    } else if (adminPassword === req.body.password) {
        res.send(JSON.stringify({ 'authorizeAdmin': true }))
    } else {
        res.send(JSON.stringify({ 'authorize': false }));
    }
    res.end();
});
app.get('/vote/time', urlencodedJson, (req, res) => { res.send(JSON.stringify(timeStart)) })
app.post('/vote', urlencodedParser, (req, res) => res.render('vote', { members: members }));
app.post('/result', urlencodedParser, function(req, res, next) {
    res.render('result')
    res.end();
});
app.post('/voted', urlencodedJson, function(req, res) {
    membersRes[req.body.radios]++;
})
app.post('/newvote', (req, res) => {
    members = [];
    membersRes = {};
    isVote = false;
    res.redirect('admin')
})
app.post('/create', urlencodedJson, (req, res) => {
    isVote = true;
    req.body.members.forEach(member => members.push(member));
    members.forEach(member => membersRes[member] = 0);
    timeStart = req.body.timeStart;

})



app.listen(3000, () => console.log('server start'));
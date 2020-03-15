const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


const password = '12345';
const members = [];
const membersRes = {};
const adminPassword = 'admin';
let isAdmin = false;



const urlencodedParser = bodyParser.urlencoded({ extended: false });
const urlencodedJson = bodyParser.json({ extended: false });
app.use('/scripts', express.static(__dirname + '/scripts'));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.redirect('authorization');
})
app.get('/admin', (req, res) => {
    res.render('admin');
})
app.get('/authorization', (req, res) => {
    res.render('authorization');
})


app.post('/admin', urlencodedJson, function(req, res, next) {
    req.body.forEach(member => members.push(member));
    members.forEach(member => membersRes[member] = 0);
    console.log(members);
    res.end();
})

app.post('/authorization', urlencodedJson, function(req, res, next) {
    console.log(req.body.password);

    if (password === req.body.password) {
        res.send(JSON.stringify({ 'authorize': true }))
    } else {
        res.send(JSON.stringify({ 'authorize': false }));
    }
    res.end();
});

app.post('/vote', urlencodedParser, (req, res) => {
    res.render('vote', { members: members })
})
app.post('/result', urlencodedParser, function(req, res, next) {
    membersRes[req.body.radios]++;
    res.end();
});




app.listen(3000, () => console.log('server start'));
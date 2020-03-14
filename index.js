const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


const password = '12345';
const adminPassword = 'admin';
let isAdmin = false;
const members = []


const urlencodedParser = bodyParser.urlencoded({ extended: false });
const urlencodedJson = bodyParser.json({ extended: false });
bodyParser.json()
app.use('/scripts', express.static(__dirname + '/scripts'));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.redirect('authorization')
})
app.get('/admin', (req, res) => {
    res.render('admin')
})
app.get('/authorization', (req, res) => {
    res.render('authorization')
})

app.post('/admin', urlencodedJson, function(req, res, next) {
    req.body.forEach(member => members.push(member));
    console.log(members);

    res.end();
})

app.post('/vote', urlencodedParser, function(req, res, next) {

    switch (req.body.password) {
        case adminPassword:
            isAdmin = true;
            res.render('vote', { members: members });
            break;
        case password:
            res.render('vote', { members: members })
            break;
        default:
            res.render('authorization');
            break;
    }
    res.end();
});

app.post('/result', urlencodedParser, function(req, res, next) {
    console.log(req.body);
    res.render('result')
    res.end();
})



app.listen(3000, () => console.log('server start'))
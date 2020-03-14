const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')


const password = '12345';
const members = []


const urlencodedParser = bodyParser.urlencoded({ extended: false });
const urlencodedJson = bodyParser.json({ extended: false });
bodyParser.json()
app.use('/scripts', express.static(__dirname + '/scripts'));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.redirect('authorization')
})
app.get('/admin', (req, res)=>{
  res.render('admin')
})
app.get('/authorization' ,(req, res)=>{
  res.render('authorization')
})

app.post('/admin', urlencodedJson, function(req,res, next){
  req.body.forEach(member => members.push(member));
  console.log(members);
  
  res.end();
})

app.post('/vote', urlencodedParser, function(req, res, next) {
    if (password === req.body.password) {
      res.render('vote', {members: members})
    } else {
      res.send('Пшол Вон')
    }

    res.end();
});

app.post('/result', urlencodedParser, function (req, res, next) {
  console.log(req.body);
  res.end();
})



app.listen(3000, () => console.log('server start'))
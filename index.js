const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const password = '12345'

app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render('authorization')
})


app.post('/vote', urlencodedParser, function(req, res, next) {
    if (password === req.body.password) {
      res.render('vote')
    } else {
      res.send('Пшол Вон')
    }
    console.log(req.body);
    res.end();
});


app.listen(3000, () => console.log('server start'))
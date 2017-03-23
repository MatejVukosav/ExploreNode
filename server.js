var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userLogin = require('./routes/userLogin'),
    userRegister = require('./routes/userRegister'),
    schedule = require('./routes/schedule');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

console.log(userLogin)
console.log(userRegister)
console.log(schedule)

app.get('/userLogin', userLogin.get);
app.post('/userLogin', userLogin.post);
app.post('/userRegister', userRegister.post);
app.get('/schedule', schedule.get);

app.listen(8081);
console.log('Listening on port 8081...');

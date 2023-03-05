const express = require('express');
const app = express();
const ews = require('express-ws')(app);
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const parser = require('cookie-parser');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(parser());

const dash = require('./routes/dashboard');
const home = require('./routes/home');
const ws = require('./routes/ws');
const rocations = require('./routes/rocations');
const help = require('./routes/help');
const cap = require('./routes/captcha');
const login = require('./routes/login');
const error = require('./routes/error');

app.use('/dashboard',dash);
app.use('/', home);
app.use('/ws',ws.router);
app.use('/rocations',rocations);
app.use('/help',help);
app.use('/captcha',cap);
app.use('/login', login);
app.use('/error', error);
app.listen(3000, () => {
    console.log('Server started on port 3000');
    }
);
module.exports = {};

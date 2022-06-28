const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));



const home = require('./routes/home');
const login = require('./routes/login');
const error = require('./routes/error');

app.use('/', home);
app.use('/login', login);
app.use('/error', error);

app.listen(3000, () => {
    console.log('Server started on port 3000');
}
);
const express = require('express');
const cookieParser = require('cookie-parser');
// const post = require('../lib/controllers/post');
// const auth = require('../lib/controllers/auth');
// const comment = require('../lib/controllers/comment');
const app = express();
const users = require('../lib/controllers/users');

//------------------------------------------------------------------------------//
// app.use(express.static(`${__dirname}/../public`)); We need this idk when though -> OAuth????
app.use(express.json());
app.use(cookieParser()); 
//------------------------------------------------------------------------------//

app.use('/api/v1/users', users);

app.use('/api/v1/preferences', require('./controllers/preference.js'));

app.use('/api/v1/users/usersinfo', require('./controllers/userInfo.js'));

app.use('/api/v1/users/usersprofile', require('./controllers/userProfile.js'));


//app.use('/api/auth', require('./controllers/auth'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));
//------------------------------------------------------------------------------//
module.exports = app;

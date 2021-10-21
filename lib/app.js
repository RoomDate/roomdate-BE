const express = require('express');
const cookieParser = require('cookie-parser');
// const post = require('../lib/controllers/post');
const auth = require('../lib/controllers/auth');
const preference = require('../lib/controllers/preference');
const userInfo = require('../lib/controllers/userInfo');
const userProfile = require('../lib/controllers/userProfile');

const app = express();
const users = require('../lib/controllers/users');

//------------------------------------------------------------------------------//
// app.use(express.static(`${__dirname}/../public`)); We need this idk when though -> OAuth????
app.use(express.json());
app.use(cookieParser()); 
//------------------------------------------------------------------------------//

app.use('/api/v1/users', users);

app.use('/api/v1/preferences', preference);

app.use('/api/v1/users/usersinfo', userInfo);

app.use('/api/v1/users/usersprofile', userProfile);

app.use('/api/auth', auth);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));
//------------------------------------------------------------------------------//
module.exports = app;

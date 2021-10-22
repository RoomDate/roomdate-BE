const express = require('express');
const cookieParser = require('cookie-parser');
// const post = require('../lib/controllers/post');
// const auth = require('../lib/controllers/auth');
// const comment = require('../lib/controllers/comment');
const app = express();
const users = require('../lib/controllers/users');
const auth = require('../lib/controllers/auth');
const userProfile = require('../lib/controllers/userProfile');
const preference = require('../lib/controllers/preference');
const userInfo = require('../lib/controllers/userInfo');
//------------------------------------------------------------------------------//
// app.use(express.static(`${__dirname}/../public`)); We need this idk when though -> OAuth????
app.use(express.json());
app.use(cookieParser()); 
//------------------------------------------------------------------------------//

app.use('/api/v1/users', users);

app.use('/api/v1/preferences', preference);

app.use('/api/v1/usersinfo', userInfo);

app.use('/api/v1/usersprofile', userProfile);
//-------------------------------------------------------------------------------//
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));
//------------------------------------------------------------------------------//
module.exports = app;

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const preference = require('../lib/controllers/preference');
const userInfo = require('../lib/controllers/userInfo');
const userProfile = require('../lib/controllers/userProfile');

const users = require('../lib/controllers/users');
//------------------------------------------------------------------------------//
app.use(express.json());
app.use(cookieParser()); 
//------------------------------------------------------------------------------//

app.use('/api/v1/users', users);

app.use('/api/v1/preferences', preference);

// app.use('/api/auth', auth);

app.use('/api/v1/usersinfo', userInfo);

app.use('/api/v1/usersprofile', userProfile);
//-------------------------------------------------------------------------------//
app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));
//------------------------------------------------------------------------------//
module.exports = app;

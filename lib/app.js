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

<<<<<<< HEAD
app.use('/api/v1/users/matches', require('./controllers/match.js'));


app.use('/api/v1/users/likes', require('./controllers/users.js'));
app.use('/api/v1/auth', require('./controllers/auth'));
=======
app.use('/api/v1/users/usersprofile', userProfile);

app.use('/api/auth', auth);
>>>>>>> b21e2609639bb23cf040a340a9d507eebba51bad

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));
//------------------------------------------------------------------------------//
module.exports = app;

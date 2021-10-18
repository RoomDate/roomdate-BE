const Router = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const userService = require('../services/userService.js');


module.exports = Router()
.get('/login', (req, res) => {
    res.redirect(`https://accounts.google.com/o/oauth2/authorize?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&scope=profile`)
})
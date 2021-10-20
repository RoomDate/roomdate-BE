const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
const ensureUser = require('../middleware/ensureUser');
const UserProfile = require('../models/UserProfile.js');


module.exports = Router()

    .post('/', ensureAuth, async (req, res, next) => {
        try {
            const usersinfo = await UserProfile.create(req.body);
            res.send(usersinfo);
        } catch (error) {
            next(error);
        }
    })
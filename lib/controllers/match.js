const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
// const ensureUser = require('../middleware/ensureUser');
const User = require('../models/User');
const Match = require('../models/Match');



module.exports = Router()
    .post('/', async (req, res, next) => {

        try {
            const newMatch = await User.sendLike(req.body);
            res.send(newMatch);
        } catch (error) {
            next(error);
        }
    })





    .get('/:id', ensureAuth, async (req, res, next) => {
        try {
           
            const current_user = req.user.username;
            const matches = await Match.getMatches(current_user);
            res.send(matches);
        } catch (error) {
            next(error);
        }
    })
;
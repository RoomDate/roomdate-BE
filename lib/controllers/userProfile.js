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
<<<<<<< HEAD
    .delete('/', ensureAuth, ensureUser, async (req, res, next) => {
=======

    .delete('/:id', ensureAuth, ensureUser, async (req, res, next) => {
>>>>>>> ab0bd325b3d729220e53dbee8056a778acf5a036
        try {
            const id = req.params.id;
            const usersinfo = await UserProfile.delete(id);

            res.send(usersinfo);

        } catch (error) {
            next(error);
        }
<<<<<<< HEAD
    });
=======
    });
>>>>>>> ab0bd325b3d729220e53dbee8056a778acf5a036

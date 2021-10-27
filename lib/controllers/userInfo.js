const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
const ensureUser = require('../middleware/ensureUser');
const UserInfo = require('../models/UserInfo');

module.exports = Router()

    .post('/', ensureAuth, async (req, res, next) => {
        try {
            const usersinfo = await UserInfo.insertNewUserInfo(req.body);
            res.send(usersinfo);
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', ensureAuth, ensureUser, async (req, res, next) => {
        try {
            const updatedUserInfo = await UserInfo.update(req.params.id, {
                ...req.body,
            });
            res.send(updatedUserInfo);
        } catch (err) {
            next(err);
        }

    });

const Router = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Preference = require('../models/Preference');


module.exports = Router()
    .post('/', ensureAuth, async (req, res, next) => {
        try {
            const newPref = await Preference.create(req.body);
            res.send(newPref);
            console.log('00000', newPref);
        } catch (error) {
            next(error);
        }
    })
;
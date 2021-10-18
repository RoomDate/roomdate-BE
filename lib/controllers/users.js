const { Router } = require('express');


module.exports = Router()


    .post('/login', ensureAuth, async (req, res, next) => {

        try{
            //cookies set
            res.send('nothing');
        }
        catch(error){

            next(error);
        }
    });

const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
const User = require('../models/User');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;



module.exports = Router()


    .post('/login', async (req, res, next) => {

        try{
   
          
            const user = await User.getUser(req.body);
            
            res.cookie('session', user.authToken(), {
                httpOnly: true,
                maxAge: ONE_DAY_IN_MS, 
                // secure: true
            });
           
            res.send(user);
        }
        catch(error){

            next(error);
        }
    });

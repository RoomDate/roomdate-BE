const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
// const ensureUser = require('../middleware/ensureUser');
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
    })
    //***might not be needed */
    .get('/zipcode/:zip', ensureAuth, async (req, res, next) => {
        try {
            const getUsersInArea = await User.getAllInZipcode(req.params.zip);
            const usersInArea = getUsersInArea.filter(user => user.username !== req.user.username);
            res.send(usersInArea);
        } catch (error) {
            next(error);
        }
    })
    .get('/roommies/zipcode/:zip', ensureAuth, async (req, res, next) => {
        try {
            // console.log('USERS', req.user);////////8*88888*

            const usersInAreaByType = await User.roommiesNearBy(req.user.username, req.params.zip);
            res.send(usersInAreaByType);
        } catch (error) {
            next(error);
        }
    })
;


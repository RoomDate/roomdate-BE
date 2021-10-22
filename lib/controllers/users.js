const { Router } = require('express');
const ensureAuth =  require('../middleware/ensureAuth');
// const ensureUser = require('../middleware/ensureUser');
const User = require('../models/User');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;



module.exports = Router()
    .post('/login', async (req, res, next) => {

        try{
            const user = await User.getUser(req.body);
            console.log('USER LOGIN', user);
            res.cookie('session', user.authToken(), {
                httpOnly: true,
                maxAge: ONE_DAY_IN_MS, 
            // secure: true
            });
            console.log('LOGIN COOKIES', res.cookie);
           
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

            const usersInAreaByType = await User.roommiesNearBy(req.user.username, req.params.zip);
            res.send(usersInAreaByType);
        } catch (error) {
            next(error);
        }
    })

    
    .post('/dislikes/:id', ensureAuth, async (req, res, next) => {
        try {
            const user_to_like = req.params.id;
            const current_user = req.user.username;
            const user_liked = await User.sendDislike(user_to_like, current_user);
            res.send(user_liked);
        } catch (error) {
            next(error);
        }
    })
    .post('/:id', ensureAuth, async (req, res, next) => {
        try {
            const user_to_like = req.params.id;
            const current_user = req.user.username;

            const user_liked = await User.sendLike(user_to_like, current_user);
            console.log('user_liked', user_liked);
            res.send(user_liked);
        } catch (error) {
            next(error);
        }
    })
    
    .get('/logout', async (req, res, next) => {
        try {
            res.clearCookie('userId');
            res.send('You are logged out of RoomDate');
        } catch (error) {
            next(error);
        }
        
    })
    
    
    
    
    
;


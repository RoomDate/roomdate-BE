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

            const usersInAreaByType = await User.roommiesNearBy(req.user.username, req.params.zip);
            res.send(usersInAreaByType);
        } catch (error) {
            next(error);
        }
    })
    .post('/usersinfo', ensureAuth, async (req, res, next) => {
        try {
            const usersinfo = await User.insertNewUserInfo(req.body);
            res.send(usersinfo);
        } catch (error) {
            next(error);
        }
    })

    .post('/likes/:id', ensureAuth, async (req, res, next) => {
        try {
            const user_to_like = req.params.id;
            const current_user = req.user.username;

            const user_liked = await User.sendLike(user_to_like, current_user);
            res.send(user_liked);
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

    .get('/matches', ensureAuth, async (req, res, next) => {
        try {
           
            const current_user = req.user.username;
            const matches = await User.getMatches(current_user);
            res.send(matches);
        } catch (error) {
            next(error);
        }
    })


    
    
    
    
    
    
    
    
;


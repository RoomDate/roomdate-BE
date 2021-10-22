const Router = require('express');
// const { urlGoogle, getGoogleAccountFromCode } = require('../utils/googleApi.js');


module.exports = Router()
// .get('/login', async (req, res, next) => {
//     try {
//         const authUrl = await urlGoogle();
//         res.redirect(authUrl);
//     } catch(err) {
//         // console.log('ERROR', err.message);
//         next(err);
//     }
// })

// .get('/login/callback', async (req, res, next) => {
        
//     try {
           
//         const user = await getGoogleAccountFromCode(req.query.code);
            

//         res.cookie('session', user.authToken(), {
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60 * 24,
//             secure: true
//         });
//         res.send(user);

//     } catch (error) {
//         next(error);
//     }
// })

    .get('/logout', async (req, res, next) => {
        try {
            res.clearCookie('userId');
            res.send('You are logged out of RoomDate');
        } catch (error) {
            next(error);
        }

    })
;



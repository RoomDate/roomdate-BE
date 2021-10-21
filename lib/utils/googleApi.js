// const { google } =  require('googleapis');
// const { drive } = require('googleapis/build/src/apis/drive');

// const googleConfig = {
//     clientId: process.env.GOOGLE_OAUTH_CLIENT_ID, 
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     redirect: process.env.REDIRECT_URL,
// };

// const defaultScope = [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
// ];

// // create google auth object 
// const createConnection = async () =>  {
//     try {
//         return await new google.auth.OAuth2(
//             googleConfig.clientId,
//             googleConfig.clientSecret,
//             googleConfig.redirect
//         );
       
//     } catch (error) {
//         // console.log(error);
//     }
       
// };


// /*
// Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
// */

// const getGoogleAccountFromCode = async (code) => {
//     const auth = await createConnection();
//     const data = await auth.getToken(code);
//     const tokens = data.tokens;
//     auth.setCredentials(tokens);

//     // connect to google drive - need this to get the user's email
//     const dog = getGoogleDriveApi(auth);
//     const me = await dog.admin({ userId: 'me' });
//     // get the google id and email
//     const userGoogleId = me.data.id;
//     const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

//     return {
//         id: userGoogleId,
//         email: userGoogleEmail,
//         tokens,
//     };
// };

// //gets url to open sign-in
// const getConnectionUrl = (auth) =>  {
//     return auth.generateAuthUrl({
//         access_type: 'offline',
//         prompt: 'consent',
//         scope: defaultScope
//     });

// };

// const getGoogleDriveApi = (oauth2) => {
//     const log = drive.context.google({ version: 'v2', auth: oauth2 });
//     return log;
// };

// /*
// Create a Google URL and send to the client to log in the user.
//  */
// const urlGoogle = async () => {
//     const auth = await createConnection();
//     const url = getConnectionUrl(auth);
//     return url;
// };




// module.exports = { urlGoogle, getGoogleAccountFromCode, defaultScope };

// const Router = require('express');
// const { urlGoogle, getGoogleAccountFromCode } = require('../utils/googleApi.js');


// module.exports = Router()
//     .get('/login', async (req, res, next) => {
//         try {
//             const authUrl = await urlGoogle();
//             res.redirect(authUrl);
//         } catch(err) {
//             // console.log('ERROR', err.message);
//             next(err);
//         }
//     })

//     .get('/login/callback', async (req, res, next) => {
        
//         try {
           
//             const user = await getGoogleAccountFromCode(req.query.code);
            

//             res.cookie('session', user.authToken(), {
//                 httpOnly: true,
//                 maxAge: 1000 * 60 * 60 * 24,
//                 secure: true
//             });
//             res.send(user);

//         } catch (error) {
//             next(error);
//         }
//     })

//     .get('/logout', async (req, res, next) => {
//         try {
//             res.clearCookie('userId');
//             res.send('You are logged out of RoomDate');
//         } catch (error) {
//             next(error);
//         }

//     })
// ;
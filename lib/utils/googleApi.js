const { google } =  require('googleapis');

const googleConfig = {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.REDIRECT_URL,
};

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
];

// create google auth object 
const createConnection = () =>  {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
};

//gets url to open sign-in
const getConnectionUrl = (auth) =>  {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
};

const getGooglePlusApi = (auth) => {
    return google.plus({ version: 'v1', auth });
};

/*
Create a Google URL and send to the client to log in the user.
 */
const urlGoogle = () => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
};

/*
Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
const getGoogleAccountFromCode = async (code) => {
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
        id: userGoogleId,
        email: userGoogleEmail,
        tokens,
    };
};

module.exports = { urlGoogle, getGoogleAccountFromCode, defaultScope };


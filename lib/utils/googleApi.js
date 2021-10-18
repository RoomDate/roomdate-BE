const fetch = require('cross-fetch');
const {google} = require('googleapis');
const querystring = require('querystring');



const oauthClient = new google.auth.OAuth2(
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
);

function getGoogleAuthURL() {
  
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes
    });
  }

const Router = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const userService = require('../services/userService.js');
const axios = require('axios');


async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);
    

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            },
        )
        .then(res => res.data)
        .catch(error => {
            throw new Error(error.message);
        });
        
    return googleUser;
}

module.exports = Router();
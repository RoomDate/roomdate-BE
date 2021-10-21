const fetch = require('cross-fetch');

const exchangeForToken = async (oauthCode) => {
    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: oauthCode,
        }),
    });

    const tokenBody = await res.json();
    return tokenBody.access_token;
};

const getUser = async (token) => {
    const res = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${token}`,
        },
    });

    const profileBody = await res.json();

    return profileBody;
};

module.exports = { exchangeForToken, getUser };
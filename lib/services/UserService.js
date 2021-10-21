const User = require('../models/User');
const { exchangeForToken, getProfile } = require('../utils/githubApi');

module.exports = class UserService {
    static async create(code) {
      
        const accessToken = await exchangeForToken(code);

        const profile = await getProfile(accessToken);

        console.log('PROFILE', profile);

        let user = await User.getUser(profile.login);

        if (!user) {
            const testUsername = 'randolf';
            user = await User.insertNewUser({
                github_id: profile.login,
                username: testUsername
            });
        }

        return user;
    }
};
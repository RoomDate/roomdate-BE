const User = require('../models/User');
const { exchangeForToken, getProfile } = require('../utils/githubApi');

module.exports = class UserService {
    static async create(code) {
    
        const accessToken = await exchangeForToken(code);

        const profile = await getProfile(accessToken);

        console.log('PROFILE', profile);

        let user = await User.getUser(profile.login);

        if (!user) {
        
            user = await User.insertNewUser({
                username: profile.login
            });
        }

        return user;
    }
};

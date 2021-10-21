const User = require('../models/User');
const { exchangeForToken, getUser } = require('../utils/githubApi');

module.exports = class UserService {
    static async create(code) {
      
        const accessToken = await exchangeForToken(code);

        const profileBody = await getUser(accessToken);

        console.log(profileBody);

        let user = await User.findByUsername(profileBody.login);

        if (!user) {
            user = await User.insert({
                username: profileBody.login,
                avatarUrl: profileBody.avatar_url,
            });
        }

        return user;
    }
};
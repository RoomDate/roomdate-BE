const jwt = require('jsonwebtoken');

async googleAuth(input, context) {
    const googleUser = await getGoogleUser({ code: input.code });

    let user = await this.userModel
        .findOne({ githubId: String(googleUser.id) })
        .exec();

    if (user) {
      // Update their profile

    }

    if (!user) {
      // Create the user in the database
        user = new User()
    }

    // Generate a JWT, add it as a cookie

    return user;
}
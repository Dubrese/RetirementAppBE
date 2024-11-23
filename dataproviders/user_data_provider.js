const User = require("../models/User");

let UserDataProvider = {
    createUser: async (email) => {
        const user = new User({email});
        return await user.save();
    }
}

module.exports = UserDataProvider;

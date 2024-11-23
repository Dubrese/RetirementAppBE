const UserOptions = require("../models/UserOptions");

let UserOptionsDataProvider = {
    upsertUserOptions: async (userId, options) => {
        return await UserOptions.findOneAndUpdate(
            { userId },
            { options },
            { upsert: true, new: true }
        );
    },
};

module.exports = UserOptionsDataProvider;

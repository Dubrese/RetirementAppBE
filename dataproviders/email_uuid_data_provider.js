const EmailUUID = require("../models/EmailUUID");

let EmailUUIDDataProvider = {
    createEmailUUID: async (email, UUID) => {
        const emailUUID = new EmailUUID({email, UUID});
        return await emailUUID.save();
    }
}

module.exports = EmailUUIDDataProvider;

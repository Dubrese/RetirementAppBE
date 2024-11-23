const Audit = require("../models/Audit");

let AuditDataProvider = {
    createAudit: async (auditData) => {
        const audit = new Audit(auditData);
        return await audit.save();
    }
}

module.exports = AuditDataProvider;

const AuditDataProvider = require('../dataproviders/audit_data_provider');
require('dotenv').config();

const AuditService = {
    registerAudit: async (auditType, data, userId) => {
        const audit = await AuditDataProvider.createAudit({ auditType, data, userId });
        return audit;
    }
}

module.exports = AuditService;
const AuditDataProvider = require('../dataproviders/audit_data_provider');
require('dotenv').config();

const AuditService = {
    registerAudit: async (auditType, data) => {
        const audit = await AuditDataProvider.createAudit({ auditType, data });
        return audit;
    }
}

module.exports = AuditService;
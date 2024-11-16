const AuditDataProvider = require('../dataproviders/audit_data_provider');
require('dotenv').config();

const Service = {
    registerAudit: async (auditType, data) => {
        const audit = await AuditDataProvider.createAudit({ auditType, data });
        return audit;
    }
}

module.exports = Service;
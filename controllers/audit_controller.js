const AuditService = require("../services/audit_service");

let AuditController = {
    registerAudit: async (req, res) => {
        const { auditType, data } = req.body;

        try {
            const audit = await AuditService.registerAudit(auditType, data);
            res.status(201).json({ message: 'Audit registered successfully', audit });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = AuditController;
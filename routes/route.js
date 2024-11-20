const express = require('express');
const AuditController = require("../controllers/audit_controller");
const CalculationController = require("../controllers/calculation_controller");

const router = express.Router();

router.route("/audit")
    .post(AuditController.registerAudit);

router.route("/corpus")
    .get(CalculationController.fetchRetirementCorpus);

router.route("/corpus/forecast")
    .get(CalculationController.fetchCorpusForeCast);

router.route("/corpus/sip")
    .get(CalculationController.fetchCorpusMonthlySIP);

router.route("/sip")
    .get(CalculationController.fetchMonthlySIP);

module.exports = router;
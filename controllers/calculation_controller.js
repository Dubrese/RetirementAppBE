const CalculationService = require("../services/calculation_service");
const AuditService = require("../services/audit_service");

let CalculationController = {
    fetchRetirementCorpus: async (req, res) => {
        const { userId, annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, postRetirementReturnRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;
        
        AuditService.registerAudit("API_Request", { endpoint: "/corpus", method: "GET", requestBody: req.body }, userId);

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            res.status(201).json({ corpus });

            AuditService.registerAudit("API_Response", { endpoint: "/corpus", response: { corpus } }, userId);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
            AuditService.registerAudit("API_Error", { endpoint: "/corpus", error: error.message }, userId);
        }
    },

    fetchCorpusForeCast: async (req, res) => {
        const { userId, annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, postRetirementReturnRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;

        AuditService.registerAudit("API_Request", { endpoint: "/corpus/forecast", method: "GET", requestBody: req.body }, userId);

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            const forecast = CalculationService.trackCorpusValuation(corpus, annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            res.status(201).json({ corpus, forecast });

            AuditService.registerAudit("API_Response", { endpoint: "/corpus/forecast", response: { corpus, forecast } }, userId);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
            AuditService.registerAudit("API_Error", { endpoint: "/corpus/forecast", error: error.message }, userId);
        }
    },

    fetchMonthlySIP: async (req, res) => {
        const { userId, corpusNeeded, currentAge, retirementAge, preRetirementReturnRate = 14, existingCorpus = 0, sipIncreaseRate = 10 } = req.body;

        AuditService.registerAudit("API_Request", { endpoint: "/sip", method: "GET", requestBody: req.body }, userId);

        try {
            const sip = CalculationService.getMonthlySIP(corpusNeeded, currentAge, retirementAge, preRetirementReturnRate, existingCorpus, sipIncreaseRate);
            res.status(201).json({ sip });

            AuditService.registerAudit("API_Response", { endpoint: "/sip", response: { sip } }, userId);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
            AuditService.registerAudit("API_Error", { endpoint: "/sip", error: error.message }, userId);
        } 
    },

    fetchCorpusMonthlySIP: async (req, res) => {
        const { userId, annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, preRetirementReturnRate = 14, postRetirementReturnRate = 10, existingCorpus = 0, sipIncreaseRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;

        AuditService.registerAudit("API_Request", { endpoint: "/corpus/sip", method: "GET", requestBody: req.body }, userId);

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            const sip = CalculationService.getMonthlySIP(corpus, currentAge, retirementAge, preRetirementReturnRate, existingCorpus, sipIncreaseRate);
            res.status(201).json({ corpus, sip });

            AuditService.registerAudit("API_Response", { endpoint: "/corpus/sip", response: { corpus, sip } }, userId);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
            AuditService.registerAudit("API_Error", { endpoint: "/corpus/sip", error: error.message }, userId);
        }
    },
    
}

module.exports = CalculationController;
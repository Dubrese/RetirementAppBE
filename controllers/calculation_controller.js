const CalculationService = require("../services/calculation_service");

let CalculationController = {
    fetchRetirementCorpus: async (req, res) => {
        const { annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, postRetirementReturnRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            res.status(201).json({ corpus });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    fetchCorpusForeCast: async (req, res) => {
        const { annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, postRetirementReturnRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            const forecast = CalculationService.trackCorpusValuation(corpus, annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            res.status(201).json({ corpus, forecast });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    fetchMonthlySIP: async (req, res) => {
        const { corpusNeeded, currentAge, retirementAge, preRetirementReturnRate = 14, existingCorpus = 0, sipIncreaseRate = 10 } = req.body;

        try {
            const sip = CalculationService.getMonthlySIP(corpusNeeded, currentAge, retirementAge, preRetirementReturnRate, existingCorpus, sipIncreaseRate);
            res.status(201).json({ sip });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } 
    },

    fetchCorpusMonthlySIP: async (req, res) => {
        const { annualExpense, oneTimeExpenses = {}, currentAge, retirementAge, inflationRate = 6, preRetirementReturnRate = 14, postRetirementReturnRate = 10, existingCorpus = 0, sipIncreaseRate = 10, longTermCapitalGainsTax = 12.5, unexpectedExpenseMargin = 25, lifeExpectancy = 100 } = req.body;

        try {
            const corpus = CalculationService.getRetirementCorpus(annualExpense, oneTimeExpenses, currentAge, retirementAge, inflationRate, postRetirementReturnRate, longTermCapitalGainsTax, unexpectedExpenseMargin, lifeExpectancy);
            const sip = CalculationService.getMonthlySIP(corpus, currentAge, retirementAge, preRetirementReturnRate, existingCorpus, sipIncreaseRate);
            res.status(201).json({ corpus, sip });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
}

module.exports = CalculationController;
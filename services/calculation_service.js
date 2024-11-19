const CalculationService = {
    getFutureValue: (presentValue, numberOfYears, inflationRate = 6) => {
        inflationRate /= 100;
        return Number((presentValue * Math.pow(1 + inflationRate, numberOfYears)).toFixed(2));
    },

    getValueAdjustedAfterReturns: (inflatedValue, numberOfYears, returnRate = 10) => {
        returnRate /= 100;
        return Number((inflatedValue / Math.pow(1 + returnRate, numberOfYears)).toFixed(2));
    },

    getRetirementCorpus: (
        totalAnnualExpense,
        oneTimeExpenses = {},
        currentAge,
        retirementAge,
        inflationRate = 6,
        postRetirementReturnRate = 10,
        longTermCapitalGainsTax = 12.5,
        unexpectedExpenseMargin = 25,
        lifeExpectancy = 100
    ) => {
        let totalRetirementCorpus = 0;

        const effectiveReturnRate = postRetirementReturnRate * (1 - longTermCapitalGainsTax / 100);
        const adjustedMargin = 1 + unexpectedExpenseMargin / 100;
        totalAnnualExpense *= adjustedMargin;

        for (let age = retirementAge; age <= lifeExpectancy; age++) {
            const oneTimeExpense = (oneTimeExpenses[age] || 0);
            const inflatedExpense = CalculationService.getFutureValue(totalAnnualExpense + oneTimeExpense, age - currentAge, inflationRate);
            const discountedExpense = CalculationService.getValueAdjustedAfterReturns(inflatedExpense, age - retirementAge, effectiveReturnRate);
            totalRetirementCorpus += discountedExpense;
        }

        return Number(totalRetirementCorpus.toFixed(2));
    },

    trackCorpusValuation: (
        initialCorpus,
        totalAnnualExpense,
        oneTimeExpenses = {},
        currentAge,
        retirementAge,
        inflationRate = 6,
        postRetirementReturnRate = 10,
        longTermCapitalGainsTax = 12.5,
        unexpectedExpenseMargin = 25,
        lifeExpectancy = 100
    ) => {
        const corpusOverYears = [];
        let currentCorpus = initialCorpus;
        let adjustedAnnualExpense = totalAnnualExpense * Math.pow(1 + inflationRate / 100, retirementAge - currentAge) * (1 + unexpectedExpenseMargin / 100);

        const effectiveReturnRate = postRetirementReturnRate * (1 - longTermCapitalGainsTax / 100);

        for (let age = retirementAge; age <= lifeExpectancy; age++) {
            const oneTimeExpense = (oneTimeExpenses[age] || 0) * Math.pow(1 + inflationRate / 100, age - currentAge);
            currentCorpus -= (adjustedAnnualExpense + oneTimeExpense);
            currentCorpus *= 1 + effectiveReturnRate / 100;

            adjustedAnnualExpense *= 1 + inflationRate / 100;

            corpusOverYears.push([age, Number(currentCorpus.toFixed(2))]);

            if (currentCorpus <= 0) {
                break;
            }
        }

        return corpusOverYears;
    },

    getMonthlySIP: (
        corpusNeeded,
        currentAge,
        retirementAge,
        preRetirementReturnRate = 14,
        existingCorpus = 0,
        sipIncreaseRate = 10
    ) => {
        const yearsToRetirement = retirementAge - currentAge;
        const monthsToRetirement = yearsToRetirement * 12;
        const monthlyPreRetirementReturnRate = preRetirementReturnRate / 1200;

        const existingCorpusAtRetirement = existingCorpus * Math.pow(1 + preRetirementReturnRate/100, yearsToRetirement);
        corpusNeeded -= existingCorpusAtRetirement;

        if (corpusNeeded <= 0) {
            return 0;
        }
        
        let sip = 0;

        if (sipIncreaseRate > 0) {
            preRetirementReturnRate /= 100;
            sipIncreaseRate /= 100;

            const totalReturnFactor = Math.pow(1+(preRetirementReturnRate/12), 12 * yearsToRetirement);
            const sipGrowthFactor = Math.pow(1+(sipIncreaseRate/12), 12 * yearsToRetirement);
            const monthlyReturnRate = preRetirementReturnRate/12;
            const monthlySipGrowthRate = sipIncreaseRate/12;

            sip = corpusNeeded / ((totalReturnFactor - sipGrowthFactor) / (monthlyReturnRate - monthlySipGrowthRate));
        } else {
            sip = corpusNeeded / ((Math.pow(1 + monthlyPreRetirementReturnRate, monthsToRetirement) - 1) / monthlyPreRetirementReturnRate * (1 + monthlyPreRetirementReturnRate));
        }

        return Number(sip.toFixed(2));
    }

};

module.exports = CalculationService;
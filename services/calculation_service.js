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
    }

};

module.exports = CalculationService;
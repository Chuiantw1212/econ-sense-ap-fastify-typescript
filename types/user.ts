export interface IUserForm {
    uid: string,
    profile: {
        dateOfBirth: string,
        gender: string,
    },
    career: {
        monthlyBasicPay: number,
        insurance: {
            salary: number,
        },
        pension: {
            salary: number,
            rate: number,
        },
        monthlyNetPay: number,
        monthlyExpense: number
    },
    retirement: {
        age: number,
        insurance: {
            presentSeniority: number,
        },
        pension: {
            employerContribution: number,
            employerContributionIncome: number,
            employeeContrubution: number,
            employeeContrubutionIncome: number,
            irrOverDecade: number,
        },
        qualityLevel: number,
        percentileRank: number,
    },
    estatePrice: {
        county: string,
        town: string,
        buildingType: string,
        buildingAge: string,
        hasParking: boolean,
    },
    estateSize: {
        doubleBedRoom: number,
        singleBedRoom: number,
        livingRoom: number,
        bathroom: number,
        publicRatio: number,
    },
    mortgage: {
        buyHouseYear: number,
        loanPercent: number,
        interestRate: number,
        loanTerm: number
    },
    parenting: {
        childAnnualExpense: number,
        independantAge: number,
        firstBornYear: number,
        secondBornYear: number,
    },
    investment: {
        allocationETF: string,
        presentAsset: number,
    }
}
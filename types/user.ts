export interface IUserFormProfile {
    dateOfBirth: string,
    gender: string,
}

export interface IUserFormCareer {
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
}

export interface IUserFormRetirement {
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
}

export interface IUserFormEstatePrice {
    county: string,
    town: string,
    buildingType: string,
    buildingAge: string,
    hasParking: boolean,
}

export interface IUserFormEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
}

export interface IUserFormMortgage {
    buyHouseYear: number,
    loanPercent: number,
    interestRate: number,
    loanTerm: number
}

export interface IUserParenting {
    childAnnualExpense: number,
    independantAge: number,
    firstBornYear: number,
    secondBornYear: number,
}

export interface IUserFormInvestment {
    allocationETF: string,
    presentAsset: number,
}

export interface IUserForm {
    uid: string,
    profile: IUserFormProfile,
    career: IUserFormCareer,
    retirement: IUserFormRetirement,
    estatePrice: IUserFormEstatePrice,
    estateSize: IUserFormEstateSize,
    mortgage: IUserFormMortgage,
    parenting: IUserParenting,
    investment: IUserFormInvestment
}
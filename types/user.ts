export interface IUserProfile {
    dateOfBirth: string,
    gender: string,
}

export interface IUserCareer {
    monthlyBasicSalary: number,
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

export interface IUserRetirement {
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

export interface IUserEstatePrice {
    county: string,
    town: string,
    buildingType: string,
    buildingAge: string,
    hasParking: string | boolean,
}

export interface IUserEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
}

export interface IUserMortgage {
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

export interface IUserInvestment {
    allocationETF: string,
    presentAsset: number,
}

export interface IUser {
    uid: string,
    profile?: IUserProfile,
    career?: IUserCareer,
    retirement?: IUserRetirement,
    estatePrice?: IUserEstatePrice,
    estateSize?: IUserEstateSize,
    mortgage?: IUserMortgage,
    parenting?: IUserParenting,
    investment?: IUserInvestment
}
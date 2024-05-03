export interface IUserProfile {
    yearOfBirth: string,
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
    budget: number, // 自備款
    budgetGoal: number, // 目標頭期款
}

export interface IUserEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
    balcany: number,
    parkingSpace: number,
}

export interface IUserMortgage {
    buyHouseYear: number,
    loanPercent: number,
    interestRate: number,
    loanTerm: number,
}

export interface IUserParenting {
    childAnnualExpense: number,
    independantAge: number,
    firstBornYear: number,
    secondBornYear: number,
    spouseMonthlyContribution: number,
    lifeInsurance: number,
}

export interface IUserInvestment {
    allocationETF: string,
    presentAsset: number,
}

export interface IUser {
    uid: string,
    id: string, // document id
    profile?: IUserProfile,
    career?: IUserCareer,
    retirement?: IUserRetirement,
    estatePrice?: IUserEstatePrice,
    estateSize?: IUserEstateSize,
    mortgage?: IUserMortgage,
    parenting?: IUserParenting,
    investment?: IUserInvestment
}
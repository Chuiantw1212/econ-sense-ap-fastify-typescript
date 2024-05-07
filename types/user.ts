export interface IUserProfile {
    yearOfBirth: string,
    gender: string,
    insuranceType: string,
    yearOfMarriage: string,
}

export interface IUserCareer {
    headCount: number,
    laborInsuranceType: string,
    monthlyBasicSalary: number,
    pension: {
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

export interface IUserInvestment {
    allocationETF: string,
    presentAsset: number,
}

export interface IUserSpouse {
    yearOfMarriage: string,
    marriageLength: number,
    monthlyContribution: number,
    weddingExpense: number,
    yearOfBirth: number,
}

export interface IUserParenting {
    childAnnualExpense: number,
    independantAge: number,
    firstBornYear: number,
    secondBornYear: number,
    spouseMonthlyContribution: number,
    lifeInsurance: number,
}

export interface IUserEstatePrice {
    county: string,
    town: string,
    buildingType: string,
    buildingAge: string,
    hasParking: string | boolean,
    unitPrice: number,
}

export interface IUserEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
    balcany: number,
    parkingSpace: number,
    floorSize: number,
}

export interface IUserMortgage {
    totalPrice: number,
    totalPriceEstimated: number,
    downpay: number, // 自備款
    downpayGoal: number, // 目標頭期款
    downpayYear: number,
    downpayPercent: number,
    loanTerm: number,
    interestRate: number,
}

export interface IUser {
    uid: string,
    id: string, // document id
    profile?: IUserProfile,
    career?: IUserCareer,
    retirement?: IUserRetirement,
    spouse?: IUserSpouse,
    estatePrice?: IUserEstatePrice,
    estateSize?: IUserEstateSize,
    mortgage?: IUserMortgage,
    parenting?: IUserParenting,
    investment?: IUserInvestment
}
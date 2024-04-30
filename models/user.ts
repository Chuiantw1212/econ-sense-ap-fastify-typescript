import fp from 'fastify-plugin'
import { CollectionReference, Query, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { extendsFastifyInstance } from '../types/fastify'
import {
    type IUserProfile,
    type IUserCareer,
    type IUserRetirement,
    type IUserEstatePrice,
    type IUserEstateSize,
    type IUserMortgage,
    type IUserParenting,
    type IUserInvestment,
    type IUser,
} from '../types/user'

export class UserModel {
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('users')
    }
    async mergeProfile(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const profile: IUserProfile = {
            gender: data.gender || '',
            dateOfBirth: data.dateOfBirth || ''
        }
        const user: IUser = {
            uid,
            profile,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeCareer(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const career: IUserCareer = {
            monthlyBasicPay: data.monthlyBasicPay || 0,
            insurance: {
                salary: data.insurance.salary || 0,
            },
            pension: {
                salary: data.pension.salary || 0,
                rate: data.pension.rate || 0,
            },
            monthlyNetPay: data.monthlyNetPay || 0,
            monthlyExpense: data.monthlyExpense || 0
        }
        const user: IUser = {
            uid,
            career,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeRetirement(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const retirement: IUserRetirement = {
            age: data.age || 0,
            insurance: {
                presentSeniority: data.insurance.presentSeniority || 0,
            },
            pension: {
                employerContribution: data.pension.employerContribution || 0,
                employerContributionIncome: data.pension.employerContributionIncome || 0,
                employeeContrubution: data.pension.employeeContrubution || 0,
                employeeContrubutionIncome: data.pension.employeeContrubutionIncome || 0,
                irrOverDecade: data.pension.irrOverDecade || 0,
            },
            qualityLevel: data.qualityLevel,
            percentileRank: data.percentileRank,
        }
        const user: IUser = {
            uid,
            retirement,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstatePrice(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estatePrice: IUserEstatePrice = {
            county: data.county || '',
            town: data.town || '',
            buildingType: data.buildingType || '',
            buildingAge: data.buildingAge || '',
            hasParking: data.hasParking || '',
        }
        const user: IUser = {
            uid,
            estatePrice,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstateSize(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estateSize: IUserEstateSize = {
            doubleBedRoom: data.doubleBedRoom || 0,
            singleBedRoom: data.singleBedRoom || 0,
            livingRoom: data.livingRoom || 0,
            bathroom: data.bathroom || 0,
            publicRatio: data.publicRatio || 0,
        }
        const user: IUser = {
            uid,
            estateSize,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeMortgage(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const mortgage: IUserMortgage = {
            buyHouseYear: data.buyHouseYear || 0,
            loanPercent: data.loanPercent || 0,
            interestRate: data.interestRate || 0,
            loanTerm: data.loanTerm || 0
        }
        const user: IUser = {
            uid,
            mortgage,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeParenting(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const parenting: IUserParenting = {
            childAnnualExpense: data.childAnnualExpense || 0,
            independantAge: data.independantAge || 0,
            firstBornYear: data.firstBornYear || 0,
            secondBornYear: data.secondBornYear || 0,
        }
        const user: IUser = {
            uid,
            parenting,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeInvestment(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const investment: IUserInvestment = {
            allocationETF: data.allocationETF || '',
            presentAsset: data.presentAsset || 0,
        }
        const user: IUser = {
            uid,
            investment,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async checkSingleDoc(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 1) {
            throw '資料重複'
        }
        return (await targetQuery.get()).docs[0]
    }
    async getUser(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count === 1) {
            const docData = (await targetQuery.get()).docs[0].data()
            return docData
        }
    }
    async addNewUser(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 0) {
            throw '資料重複'
        }
        const userForm: IUser = {
            uid,
            profile: {
                dateOfBirth: "",
                gender: "",
            },
            career: {
                monthlyBasicPay: 0,
                insurance: {
                    salary: 0,
                },
                pension: {
                    salary: 0,
                    rate: 0,
                },
                monthlyNetPay: 0,
                monthlyExpense: 0
            },
            retirement: {
                age: 0,
                insurance: {
                    presentSeniority: 0,
                },
                pension: {
                    employerContribution: 0,
                    employerContributionIncome: 0,
                    employeeContrubution: 0,
                    employeeContrubutionIncome: 0,
                    irrOverDecade: 0,
                },
                qualityLevel: 0,
                percentileRank: 0,
            },
            estatePrice: {
                county: "",
                town: "",
                buildingType: "",
                buildingAge: "",
                hasParking: false,
            },
            estateSize: {
                doubleBedRoom: 0,
                singleBedRoom: 0,
                livingRoom: 0,
                bathroom: 0,
                publicRatio: 0,
            },
            mortgage: {
                buyHouseYear: 0,
                loanPercent: 0,
                interestRate: 0,
                loanTerm: 0
            },
            parenting: {
                childAnnualExpense: 0,
                independantAge: 0,
                firstBornYear: 0,
                secondBornYear: 0,
            },
            investment: {
                allocationETF: "",
                presentAsset: 0,
            }
        }
        this.collection.add(userForm)
        return userForm
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('UserModel', new UserModel(fastify))
})
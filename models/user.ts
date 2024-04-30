import fp from 'fastify-plugin'
import { CollectionReference, QuerySnapshot, } from 'firebase-admin/firestore'
import type { extendsFastifyInstance } from '../types/fastify'
import type {
    IUserProfile,
    IUserCareer,
    IUserRetirement,
    IUserEstatePrice,
    IUserEstateSize,
    IUserMortgage,
    IUserParenting,
    IUserInvestment,
    IUser
} from '../types/user'

export class UserModel {
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('users')
    }
    async mergeByKey(uid: string, formKey: string, form: any) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 1) {
            throw '資料重複'
        }
        const docRef = (await targetQuery.get()).docs[0].ref
        docRef.update({
            [formKey]: form
        })
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
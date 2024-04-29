import fp from 'fastify-plugin'
import { CollectionReference, QuerySnapshot, } from 'firebase-admin/firestore'
import type { extendsFastifyInstance } from '../types/fastify'

interface UserForm {
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
        hasParking: string,
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

export class UserModel {
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('users')
    }
    async getUserForm(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count === 1) {
            const docData = (await targetQuery.get()).docs[0].data()
            return docData
        }
    }
    async addUserForm(form: UserForm) {

    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('UserModel', new UserModel(fastify))
})
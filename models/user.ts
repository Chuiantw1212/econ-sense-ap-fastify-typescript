import fp from 'fastify-plugin'
import { CollectionReference, QuerySnapshot, } from 'firebase-admin/firestore'
import type { extendsFastifyInstance } from '../types/fastify.ts'
export class UserModel {
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('users')
    }
    async getUserForm(uid: string) {
        const querySnapshot: QuerySnapshot = await this.collection.where('uid', '==', uid).limit(1).get()
        return querySnapshot.docs[0].data()
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('UserModel', new UserModel(fastify))
})
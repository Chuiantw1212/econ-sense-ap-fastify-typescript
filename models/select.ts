import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.ts'
import type { IOptionsItem, } from '../types/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData } from 'firebase-admin/firestore'
export class Select {
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('selects')
    }
    async replaceByKey(key: string, options: IOptionsItem[] = []) {
        const keyQuery: Query = this.collection.where('key', '==', key)
        const countData: DocumentData = await keyQuery.count().get()
        const count: number = countData.data().count
        switch (count) {
            case 0: {
                this.collection.add({
                    key,
                    options
                })
                break;
            }
            case 1: {
                const snapshot: QuerySnapshot = await keyQuery.get()
                snapshot.forEach(data => {
                    const dataReference: DocumentReference = data.ref
                    dataReference.set({
                        options,
                    }, { merge: true });
                })
                break;
            }
            default: {
                throw '資料有誤'
            }
        }
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('SelectModel', new Select(fastify))
})
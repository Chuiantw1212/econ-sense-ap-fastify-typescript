import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.ts'
import type { IOptionsItem, ICounty, ITown, ISelectMap, ISelectDocData } from '../types/select'
import type { ICollection, IDocument } from '../types/firebase.js'
export class Select {
    collection: ICollection
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('selects')
    }
    replaceByKey(key: string, items: IOptionsItem[] = []) {
        const ref = this.collection.get()
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('SelectModel', new Select(fastify))
})
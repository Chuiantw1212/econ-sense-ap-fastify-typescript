import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import { getFirestore, Firestore, CollectionReference, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { IOptionsItem, ICounty, ITown, ISelectMap, } from '../types/select'

export class Ndc {
    // counties: IOptionsItem[] = []
    // townMap: ISelectMap = {}
    collection: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('lifeExpectancies')
        this.uploadFiles()
    }
    async uploadFiles() {
        const dataset = require('./test.json')
        console.log(dataset);
        const ceYearSet = new Set()
        const rocYearSet = new Set()
        
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('NdcModel', new Ndc(fastify))
})
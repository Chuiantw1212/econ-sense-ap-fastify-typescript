import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import type { ICollection, IDocument } from '../types/googleCloud'
import type { IOptionsItem, ICounty, ITown, ISelectMap, ISelectDocData } from '../types/select'
const { XMLParser, } = require("fast-xml-parser");

export class Location {
    counties: IOptionsItem[] = []
    townMap: ISelectMap = {}
    collection: ICollection
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('locations')
        this.setCountiesAndTowns()
    }
    async fetchCountiesAndTowns() {
        // Set counties from https://data.gov.tw/dataset/101905
        const result = await axios.get('https://api.nlsc.gov.tw/other/ListCounty')
        const parser = new XMLParser();
        const jsonResult = parser.parse(result.data);
        const countyItems = jsonResult.countyItems.countyItem
        this.counties = countyItems.map((item: ICounty) => {
            return {
                value: item.countycode,
                label: item.countyname,
            }
        })
        // Set townMap from https://data.gov.tw/dataset/102011
        const promises = this.counties.map((county: IOptionsItem) => {
            const promise = axios.get(`https://api.nlsc.gov.tw/other/ListTown1/${county.value}`)
            return promise
        })
        const townResults = await Promise.all(promises)
        this.counties.forEach((county: IOptionsItem, index) => {
            this.townMap[county.value] = townResults[index].data.map((item: ITown) => {
                return {
                    label: item.townname,
                    value: item.towncode,
                }
            })
        })
    }
    async setCountiesAndTowns() {
        const snapshots = await this.collection.get()
        const promises = snapshots.docs.map((doc: IDocument) => {
            return doc.data()
        })
        const items: ISelectDocData[] = await Promise.all(promises)
        items.forEach((item: ISelectDocData) => {
            if (item.key === 'TW') {
                this.counties = item.options
            } else {
                this.townMap[item.key] = item.options
            }
        })
    }
    async putAllItems(selectMap: ISelectMap) {
        try {
            const snapshots = await this.collection.get()
            const promises = snapshots.docs.map((doc: IDocument) => {
                return this.collection.doc(doc.id).delete()
            })
            await Promise.all(promises)
            for (let key in selectMap) {
                const options = selectMap[key]
                await this.collection.add({
                    key,
                    options
                })
            }
        } catch (error) {
            throw error
        }
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('LocationModel', new Location(fastify))
})
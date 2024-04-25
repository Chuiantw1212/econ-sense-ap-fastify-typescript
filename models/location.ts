import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.js'
import type { ICollection, IDocument } from '../types/googleCloud.js'
const { XMLParser, } = require("fast-xml-parser");

interface ISelectItem {
    label: string,
    value: string,
}

interface ICounty {
    countycode: string,
    countyname: string,
    countycode01: number,
}

interface ITown {
    towncode: string,
    townname: string,
    towncode01: number,
}

interface ISelectMap {
    [key: string]: ISelectItem[];
}

export class Location {
    counties: ISelectItem[] = []
    locationMap: ISelectMap = {}
    collection: ICollection
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.googleCloud
        this.collection = firestore.collection('locations')
        // this.setCountiesAndTowns()
    }
    async setCountiesAndTowns() {
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
        // Set locationMap from https://data.gov.tw/dataset/102011
        const promises = this.counties.map((county: ISelectItem) => {
            const promise = axios.get(`https://api.nlsc.gov.tw/other/ListTown1/${county.value}`)
            return promise
        })
        const townResults = await Promise.all(promises)
        this.counties.forEach((county: ISelectItem, index) => {
            this.locationMap[county.value] = townResults[index].data.map((item: ITown) => {
                return {
                    label: item.townname,
                    value: item.towncode,
                }
            })
        })
        // Add TW counties in locationMap
        this.locationMap.TW = this.counties
        // Upload select options
        this.checkAllItems(this.locationMap)
    }
    async checkAllItems(selectMap: ISelectMap) {
        console.log(selectMap);

        try {
            // const snapshots = await this.collection.get()
            // const promises = snapshots.docs.map((doc: IDocument) => {
            //     return this.collection.doc(doc.id).delete()
            // })
            // await Promise.all(promises)
            // for (let key in selectMap) {
            //     const options = selectMap[key]
            //     await this.collection.add({
            //         key,
            //         options
            //     })
            // }
        } catch (error) {
            throw error
        }
    }
}
export default fp(function (fastify: any) {
    const selectModel = new Location(fastify)
    fastify.decorate('SelectModel', selectModel)
})
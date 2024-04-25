import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import type { ICollection, IDocument } from '../types/googleCloud'
// const { XMLParser, } = require("fast-xml-parser");
import type { ISelectItem, ICounty, ITown, ISelectMap } from '../types/select'


export class Location {
    counties: ISelectItem[] = []
    locationMap: ISelectMap = {}
    // collection: ICollection
    constructor(fastify: extendsFastifyInstance) {
        console.log('Location');
    }
    // async setCountiesAndTowns() {
    //     // Set counties from https://data.gov.tw/dataset/101905
    //     const result = await axios.get('https://api.nlsc.gov.tw/other/ListCounty')
    //     const parser = new XMLParser();
    //     const jsonResult = parser.parse(result.data);
    //     const countyItems = jsonResult.countyItems.countyItem
    //     this.counties = countyItems.map((item: ICounty) => {
    //         return {
    //             value: item.countycode,
    //             label: item.countyname,
    //         }
    //     })
    //     // Set locationMap from https://data.gov.tw/dataset/102011
    //     const promises = this.counties.map((county: ISelectItem) => {
    //         const promise = axios.get(`https://api.nlsc.gov.tw/other/ListTown1/${county.value}`)
    //         return promise
    //     })
    //     const townResults = await Promise.all(promises)
    //     this.counties.forEach((county: ISelectItem, index) => {
    //         this.locationMap[county.value] = townResults[index].data.map((item: ITown) => {
    //             return {
    //                 label: item.townname,
    //                 value: item.towncode,
    //             }
    //         })
    //     })
    //     // Add TW counties in locationMap
    //     this.locationMap.TW = this.counties
    // }
    // async checkAllItems(selectMap: ISelectMap) {
    //     try {
    //         // const snapshots = await this.collection.get()
    //         // const promises = snapshots.docs.map((doc: IDocument) => {
    //         //     return this.collection.doc(doc.id).delete()
    //         // })
    //         // await Promise.all(promises)
    //         // for (let key in selectMap) {
    //         //     const options = selectMap[key]
    //         //     await this.collection.add({
    //         //         key,
    //         //         options
    //         //     })
    //         // }
    //     } catch (error) {
    //         throw error
    //     }
    // }
}
export default fp(function (fastify: any) {
    const locationModel = new Location(fastify)
    fastify.decorate('LocationModel', locationModel)
})
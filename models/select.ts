import axios from 'axios'
import fp from 'fastify-plugin'
const { XMLParser, } = require("fast-xml-parser");

interface ISelectItem {
    name: string,
    code: string,
    code01: number,
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

interface ITownMap {
    [key: string]: ISelectItem[];
}

export class Select {
    counties: ISelectItem[] = []
    towns: ITownMap = {}
    constructor() {
        this.setCountiesAndTowns()
    }
    async setCountiesAndTowns() {
        // Set counties from https://data.gov.tw/dataset/101905
        const result = await axios.get('https://api.nlsc.gov.tw/other/ListCounty')
        const parser = new XMLParser();
        const jsonResult = parser.parse(result.data);
        const countyItems = jsonResult.countyItems.countyItem
        this.counties = countyItems.map((item: ICounty) => {
            return {
                code: item.countycode,
                name: item.countyname,
                code01: item.countycode01,
            }
        })
        // Set towns from https://data.gov.tw/dataset/102011
        const promises = this.counties.map((county: ISelectItem) => {
            const promise = axios.get(`https://api.nlsc.gov.tw/other/ListTown1/${county.code}`)
            return promise
        })
        const townResults = await Promise.all(promises)
        this.counties.forEach((county: ISelectItem, index) => {
            this.towns[county.code] = townResults[index].data.map((item: ITown) => {
                return {
                    name: item.townname,
                    code: item.towncode,
                    code01: item.towncode01,
                }
            })
        })
    }
}
export default fp(async function (fastify: any, opts) {
    const selectModel = new Select()
    fastify.decorate('SelectModel', selectModel)
})
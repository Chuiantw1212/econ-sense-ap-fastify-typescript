import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.js'
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

interface ICounty {
    code: string,
    name: string,
    countycode01: number,
}

export class Select {
    counties: ICounty[] = []
    constructor(fastify: extendsFastifyInstance) {
        if (!this.counties.length) {
            this.setCounties()
        }
    }
    async setCounties() {
        const result = await axios.get('https://api.nlsc.gov.tw/other/ListCounty')
        const parser = new XMLParser();
        const jsonResult = parser.parse(result.data);
        const countyItems = jsonResult.countyItems.countyItem
        this.counties = countyItems
    }
}
export default fp(async function (fastify: any, opts) {
    const selectModel = new Select(fastify)
    fastify.decorate('SelectModel', selectModel)
})
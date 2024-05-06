import axios from 'axios'
import fp from 'fastify-plugin'
import { JSDOM } from 'jsdom'
import type { extendsFastifyInstance } from '../types/fastify'
import type { IOptionsItem, } from '../types/select'

export class BankModel {
    interestRate: number = 0
    selectModel: any = null
    constructor(fastify: extendsFastifyInstance) {
        this.selectModel = fastify.SelectModel
        this.fetchInterestRate()
        this.fetchCoreSeriesIRR()
    }
    async getCoreSeriesIRR() {
        const options = await this.selectModel.getOptionsByKey('ishareCoreETF')
        if (options.length) {
            return options
        } else {
            this.fetchCoreSeriesIRR()
        }
    }
    async fetchCoreSeriesIRR() {
        const urlMap: { [key: string]: string } = {
            aoa: 'https://www.ishares.com/us/products/239729/ishares-aggressive-allocation-etf',
            aor: 'https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf',
            aom: 'https://www.ishares.com/us/products/239765/ishares-moderate-allocation-etf',
            aok: 'https://www.ishares.com/us/products/239733/ishares-conservative-allocation-etf',
        }
        const coreKeys = Object.keys(urlMap)
        // const portfolioOptions: IOptionsItem[] = []
        const promiese = coreKeys.map(async key => {
            const crawlResult = await axios.request({
                url: urlMap[key],
            })
            const pageHtml = crawlResult.data
            const dom = new JSDOM(pageHtml)
            const document = dom.window.document
            const tds = document.getElementsByClassName("sinceInceptionAnnualized ")
            const lastItem = Array.from(tds)[tds.length - 1]
            const irrString = String(lastItem.innerHTML).trim()
            const portfolioOption: IOptionsItem = {
                label: key,
                value: Number(irrString)
            }
            return portfolioOption
        })
        const portfolioOptions: IOptionsItem[] = await Promise.all(promiese)
        this.selectModel.replaceByKey('ishareCoreETF', portfolioOptions)
        return portfolioOptions
    }
    async fetchInterestRate() {
        if (this.interestRate) {
            return this.interestRate
        }

        const crawlResult = await axios.request({
            url: 'https://www.cbc.gov.tw/tw/lp-370-1.html',
        })
        const pageHtml = crawlResult.data
        const dom = new JSDOM(pageHtml)
        const document = dom.window.document
        const tds = document.getElementsByTagName('td')
        const filteredItems = Array.from(tds).filter(item => {
            return item.dataset.th === '擔保放款融通利率'
        })
        const mostRecentItem = filteredItems[0]
        const interestRate = mostRecentItem.innerHTML.replaceAll(/(<[^>]*>|\n)/g, '')
        this.interestRate = Number(interestRate)

        return this.interestRate
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('BankModel', new BankModel(fastify))
})
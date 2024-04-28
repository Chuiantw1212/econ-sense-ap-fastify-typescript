import axios from 'axios'
import fp from 'fastify-plugin'
import { JSDOM } from 'jsdom'
import type { extendsFastifyInstance } from '../types/fastify'

export class BankModel {
    interestRate: number = 0
    portfolioIRR: { [key: string]: number } = {
        aoa: 0,
        aor: 0,
        aom: 0,
        aok: 0
    }
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.fetchInterestRate()
        this.fetchCoreSeriesIRR()
    }
    async fetchCoreSeriesIRR() {
        if (this.portfolioIRR.aoa) {
            return this.portfolioIRR
        }
        try {
            const urlMap: { [key: string]: string } = {
                aoa: 'https://www.ishares.com/us/products/239729/ishares-aggressive-allocation-etf',
                aor: 'https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf',
                aom: 'https://www.ishares.com/us/products/239765/ishares-moderate-allocation-etf',
                aok: 'https://www.ishares.com/us/products/239733/ishares-conservative-allocation-etf',
            }
            const coreKeys = Object.keys(urlMap)
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
                this.portfolioIRR[key] = Number(irrString)
            })
            await Promise.all(promiese)
        } catch (error) {
            this.portfolioIRR = {
                // 2024.04.28 的紀錄
                aoa: 7.83,
                aor: 6.05,
                aom: 4.38,
                aok: 3.53,
            }
        }
        return this.portfolioIRR
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
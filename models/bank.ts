import axios from 'axios'
import fp from 'fastify-plugin'
import { JSDOM } from 'jsdom'
import type { extendsFastifyInstance } from '../types/fastify'

export class BankModel {
    interestRate: number = 0
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.fetchInterestRate()
    }
    async fetchInterestRate() {
        if (this.interestRate) {
            return this.interestRate
        }

        const crawlCompanyResult = await axios.request({
            url: 'https://www.cbc.gov.tw/tw/lp-370-1.html',
        })
        const pageHtml = crawlCompanyResult.data
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
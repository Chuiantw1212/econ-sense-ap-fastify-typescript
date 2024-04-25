import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import fs from 'fs'

interface IPriceTableItem {
    '縣市名稱': string;
    '鄉鎮市區名稱': string;
    '買賣契約年季': string;
    '建物類別': string;
    '契約單價[萬元/坪]': string;
    '建坪[坪]': string;
    '屋齡[年]': string;
    '含車位價格': string;
}

export class JCIC {
    constructor(fastify: extendsFastifyInstance) {
        this.getContractPriceTable()
        // console.log('JCIC');
    }
    async getMortgageLocation() {
        const result = await axios.get('https://www.jcic.org.tw/openapi/api/Mortgage_Location')
    }
    async getContractPriceTable() {
        var someObject = require('../ContractPrice_TABLE_C_2023.json')
        // console.log('processing');
        // const result = await axios.get('https://www.jcic.org.tw/openapi/api/ContractPriceTableC2023')
        // console.log('completed');
        // Prepare sets
        const divisionSet1: Set<string> = new Set()
        const additionalTypeSet: Set<string> = new Set()
        const floorSizeSet: Set<string> = new Set()
        const ageSet: Set<string> = new Set()
        const unitPrice: Set<string> = new Set()
        const contractPriceTableItems: IPriceTableItem[] = someObject
        contractPriceTableItems.forEach((item: IPriceTableItem) => {
            divisionSet1.add(item['縣市名稱'])
            additionalTypeSet.add(item['建物類別'])
            floorSizeSet.add(item['建坪[坪]'])
            ageSet.add(item['屋齡[年]'])
            unitPrice.add(item['契約單價[萬元/坪]'])
        })
        // Array from 
        try {
            const additionalTypeItems: string[] = Array.from(additionalTypeSet)
            const t1 = JSON.stringify(additionalTypeItems)
            fs.writeFileSync('建物類別', t1);

            const floorSizeItems: string[] = Array.from(floorSizeSet)
            const t2 = JSON.stringify(floorSizeItems)
            fs.writeFileSync('大小', t2);

            const ageItems: string[] = Array.from(ageSet)
            const t3 = JSON.stringify(ageItems)
            fs.writeFileSync('屋齡', t3);

            const priceItems: string[] = Array.from(unitPrice)
            const t4 = JSON.stringify(priceItems)
            fs.writeFileSync('單價', t4);

            console.log('JSON data saved to file successfully.');
        } catch (error) {
            console.error('Error writing JSON data to file:', error);
        }
        const division1Items: string[] = Array.from(divisionSet1)
        // division1Items.forEach((division1Value: string) => {
        //     const matchedItems: IPriceTableItem[] = contractPriceTableItems.filter(item => {
        //         return item['縣市名稱'] === division1Value
        //     })
        //     try {
        //         const jsonString = JSON.stringify(matchedItems)
        //         fs.writeFileSync(division1Value, jsonString);
        //         console.log('JSON data saved to file successfully.');
        //     } catch (error) {
        //         console.error('Error writing JSON data to file:', error);
        //     }
        // })
    }

    //     import axios from 'axios'
    // const result = await axios.get('https://storage.googleapis.com/public.econ-sense.com/ContractPrice_TABLE_C_2023.json')
    // console.log(result.data)
}
export default fp(async function (fastify: any) {
    fastify.decorate('JcicModel', new JCIC(fastify))
})
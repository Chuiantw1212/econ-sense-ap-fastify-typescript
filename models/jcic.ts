import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import fs from 'fs'
import type { IOptionsItem, } from '../types/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData, FieldValue } from 'firebase-admin/firestore'
import { Select } from './select'

interface IPriceTableRawItem {
    '縣市名稱': string;
    '鄉鎮市區名稱': string;
    '買賣契約年季': string;
    '建物類別': string;
    '契約單價[萬元/坪]': string;
    '建坪[坪]': string;
    '屋齡[年]': string;
    '含車位價格': string;
}

interface IPriceTableItem {
    'county': string,
    'town': string,
    'contractYear': string,
    'buildingType': string,
    'unitPrice': number,
    'floorSize': string,
    'buildingAge': string,
    'hasParking': string,
}

export class JCIC {
    SelectModel: Select
    collectionContracts: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const {
            SelectModel,
            firebase,
        } = fastify
        this.SelectModel = SelectModel
        this.collectionContracts = firebase.firestore.collection('jcicContracts')
    }
    async getMortgageLocation() {
        const result = await axios.get('https://www.jcic.org.tw/openapi/api/Mortgage_Location')
    }
    async getContractPriceTable() {
        let resultData = []
        resultData = require('./ContractPrice_TABLE_C_2023')
        if (!resultData) {
            const result = await axios.get('https://www.jcic.org.tw/openapi/api/ContractPriceTableC2023')
            resultData = result.data
        }
        const contractPriceTableRawItems: IPriceTableRawItem[] = resultData
        const contractPriceTableItems: IPriceTableItem[] = contractPriceTableRawItems.map(item => {
            return {
                'county': item['縣市名稱'],
                'town': item['鄉鎮市區名稱'],
                'contractYear': item['買賣契約年季'],
                'buildingType': item['建物類別'],
                'unitPrice': Number(item['契約單價[萬元/坪]']),
                'floorSize': item['建坪[坪]'],
                'buildingAge': item['屋齡[年]'],
                'hasParking': item['含車位價格'],
            }
        })
        let index = 0
        setInterval(async () => {
            const item = contractPriceTableItems[index++]
            await this.collectionContracts.add(item)
            console.log(`total ${contractPriceTableItems.length}, ${index} added.`)
        }, 100)
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('JcicModel', new JCIC(fastify))
})
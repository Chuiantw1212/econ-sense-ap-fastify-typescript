import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import { Query, CollectionReference, DocumentData, AggregateField, FieldValue } from 'firebase-admin/firestore'
import { Select } from './select'
import { Location } from './location'

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
    county?: string,
    town?: string,
    contractYear?: string,
    buildingType?: string,
    unitPrice?: number,
    floorSize?: string,
    buildingAge?: string,
    hasParking?: boolean,
}

export class JCIC {
    SelectModel: Select
    LocationModel: Location
    collectionContracts: CollectionReference
    constructor(fastify: extendsFastifyInstance) {
        const {
            SelectModel,
            LocationModel,
            firebase,
        } = fastify
        this.SelectModel = SelectModel
        this.LocationModel = LocationModel
        this.collectionContracts = firebase.firestore.collection('jcicContracts')
    }
    async getContractsByQuery(query: IPriceTableItem) {
        let contractQuery: Query = this.collectionContracts
        if (query.county) {
            let countyLabel = this.LocationModel.getCountyLabel(query.county)
            countyLabel = countyLabel?.replace('臺', '台')
            contractQuery = contractQuery.where('county', '==', countyLabel)
            if (query.town) {
                const townLabel = this.LocationModel.getTownLabel(query.county, query.town)
                contractQuery = contractQuery.where('town', '==', townLabel)
            }
        }
        if (query.buildingAge) {
            contractQuery = contractQuery.where('buildingAge', '==', query.buildingAge)
        }
        if (query.buildingType) {
            contractQuery = contractQuery.where('buildingType', '==', query.buildingType)
        }
        const countData: DocumentData = await contractQuery.count().get()
        const count: number = countData.data().count

        const firstDoc = await contractQuery.orderBy('unitPrice', 'asc').limit(1)
        const lastDoc = await contractQuery.orderBy('unitPrice', 'asc').limitToLast(1)
        /**
         * Firestore資料分析
         * https://firebase.google.com/docs/firestore/query-data/aggregation-queries
         */
        const averageAggregateQuery = contractQuery.aggregate({
            averageUnitPrice: AggregateField.sum('unitPrice'),
        });

        const snapshot = await averageAggregateQuery.get();
        console.log('unitPrice: ', snapshot.data().averageUnitPrice);
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

        const countData: DocumentData = await this.collectionContracts.count().get()
        const count: number = countData.data().count
        const contractPriceTableRawItems: IPriceTableRawItem[] = resultData
        const contractPriceTableItems: IPriceTableItem[] = contractPriceTableRawItems.slice(count, contractPriceTableRawItems.length).map(item => {
            const county = item['縣市名稱']
            const traditionCounty = county.replace('台', '臺')
            const booleanMap: { [key: string]: boolean } = {
                '無': false,
                '有': true,
            }
            return {
                'county': traditionCounty,
                'town': item['鄉鎮市區名稱'],
                'contractYear': item['買賣契約年季'],
                'buildingType': item['建物類別'],
                'unitPrice': Number(item['契約單價[萬元/坪]']),
                'floorSize': item['建坪[坪]'],
                'buildingAge': item['屋齡[年]'],
                'hasParking': booleanMap[item['含車位價格']],
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
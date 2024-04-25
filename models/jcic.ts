import axios from 'axios'
import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.js'
export class JCIC {
    // googleCloud: GoogleCloud
    constructor(fastify: extendsFastifyInstance) {
  
    }
    async getMortgageLocation() {
        const result = await axios.get('https://www.jcic.org.tw/openapi/api/Mortgage_Location')
        console.log(result.data)
    }
}
export default fp(async function (fastify: any, opts) {
    const jcicModal = new JCIC(fastify)
    fastify.decorate('JcicModel', jcicModal)
})
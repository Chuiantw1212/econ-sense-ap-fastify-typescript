import axios from 'axios'
import fp from 'fastify-plugin'

export class Select {
    collections = null
    constructor() {
        
    }
}
export default fp(async function (fastify: any, opts) {
    const selectModel = new Select()
    fastify.decorate('SelectModel', selectModel)
})
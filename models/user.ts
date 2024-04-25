import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.ts'
import { GoogleCloud } from '../plugins/googleCloud.js'
export class User {
    googleCloud: GoogleCloud
    constructor(fastify: extendsFastifyInstance) {
        const { googleCloud } = fastify
        this.googleCloud = googleCloud
    }
    async getPublicFiles() {
        this.googleCloud.getPublicFiles()
    }
}
export default fp(async function (fastify: any, opts) {
    const userModel = new User(fastify)
    fastify.decorate('UserModel', userModel)
})
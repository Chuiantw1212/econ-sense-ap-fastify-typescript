import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.ts'
export class User {
    constructor(fastify: extendsFastifyInstance) {

    }
    async getPublicFiles() {
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('UserModel', new User(fastify))
})
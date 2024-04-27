import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify.ts'
export class UserModel {
    constructor(fastify: extendsFastifyInstance) {

    }
    async getPublicFiles() {
    }
}
export default fp(async function (fastify: any) {
    fastify.decorate('UserModel', new UserModel(fastify))
})
import type { extendsFastifyInstance } from '../types/fastify.ts'
export default async function (fastify: extendsFastifyInstance,) {
    const { UserModel, } = fastify
    fastify.get('/', async function (request, reply) {
        UserModel.getPublicFiles()
    })
}

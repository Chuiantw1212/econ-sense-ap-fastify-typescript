import type { extendsFastifyInstance } from '../types/fastify.ts'
export default async function (fastify: extendsFastifyInstance,) {
    const {
        UserModel,
        JcicModel,
        SelectModel
    } = fastify
    fastify.get('/', async function (request, reply) {
        // UserModel.getPublicFiles()
        // await JcicModel.getContractPriceTable()
        // SelectModel.getCounties()
    })
}

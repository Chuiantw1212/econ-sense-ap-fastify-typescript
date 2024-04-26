import type { extendsFastifyInstance } from '../types/fastify.ts'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        LocationModel,
        SelectModel,
        JcicModel,
        NdcModel,
    } = fastify as extendsFastifyInstance
    fastify.post('/calculate/lifeExpectancy', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const lifeExpectancy = await NdcModel.calculateLifeExpectancy(req.body as any)
            res.status(200).send(lifeExpectancy)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
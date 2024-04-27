import type { extendsFastifyInstance } from '../types/fastify.js'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        LocationModel,
        SelectModel,
        JcicModel,
    } = fastify as extendsFastifyInstance
    fastify.post('/bank/config', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            // console.log(req.body)
            // await JcicModel.getContractsByQuery(req.body as any)
            res.status(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
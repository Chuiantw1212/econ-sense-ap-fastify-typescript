import type { extendsFastifyInstance } from '../types/fastify.ts'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify'
export default fp(async function (fastify: any) {
    const {
        LocationModel
    } = fastify
    fastify.get('/select', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const response = LocationModel.getCountiesAndTowns()
            res.status(200).send(response)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
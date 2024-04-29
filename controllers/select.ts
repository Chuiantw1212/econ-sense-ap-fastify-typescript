import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        LocationModel,
        SelectModel,
    } = fastify as extendsFastifyInstance
    fastify.get('/select', async function (req: FastifyRequest, res: FastifyReply) {
        try {

            const countiesAndTownMap = await LocationModel.getCountiesAndTowns()
            const selectOptionsMap = await SelectModel.getOptionsMap()
            const result = {
                ...countiesAndTownMap,
                ...selectOptionsMap,
            }
            res.status(200).send(result)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
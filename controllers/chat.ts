import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        chatGpt,
    } = fastify as extendsFastifyInstance
    fastify.post('/chat', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const { story } = req.body as any
            const result = await chatGpt.sendMessage(story)
            res.code(200).send(result)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})

import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        chatGpt,
    } = fastify as extendsFastifyInstance
    fastify.post('/chat/story', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const input = req.body as any
            const output = await chatGpt.makeStory(input)
            res.code(200).send(output)
        } catch (error: any) {
            console.log(error.message || error)
            res.code(500).send(error.message || error)
        }
    })
})

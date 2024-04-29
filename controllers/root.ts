import { FastifyRequest, FastifyReply, } from 'fastify'
import fp from 'fastify-plugin'
export default fp(async function (fastify) {
    fastify.get('/', async function (req: FastifyRequest, res: FastifyReply) {
        res.status(200).send('Hello, World!')
    })
})

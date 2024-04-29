import type { extendsFastifyInstance } from '../types/fastify.ts'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default async function (fastify: extendsFastifyInstance,) {
    fastify.get('/', async function (req: FastifyRequest, res: FastifyReply) {
        res.status(200).send('Hello, World!')
    })
}

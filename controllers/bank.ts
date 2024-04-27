import type { extendsFastifyInstance } from '../types/fastify.js'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        BankModel
    } = fastify as extendsFastifyInstance
    fastify.post('/bank/config', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const response = {
                interestRate: 0
            }
            response.interestRate = await BankModel.fetchInterestRate()
            res.status(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        BankModel
    } = fastify as extendsFastifyInstance
    fastify.get('/bank/config', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const interestRate = await BankModel.fetchInterestRate()
            const portfolioIRR = await BankModel.fetchCoreSeriesIRR()
            const response = {
                interestRate,
                portfolioIRR
            }
            res.code(200).send(response)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
export default fp(async function (fastify) {
    const {
        BankModel
    } = fastify as extendsFastifyInstance
    fastify.get('/bank/config/interestRate', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const interestRate = await BankModel.fetchInterestRate()
            res.code(200).send(interestRate)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.get('/bank/config/portfolioIrr', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const portfolioIRR = await BankModel.getCoreSeriesIRR()
            res.code(200).send(portfolioIRR)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
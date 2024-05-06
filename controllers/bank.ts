import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, } from 'fastify'
import type { IOptionsItem, } from '../types/select'

export default fp(async function (fastify) {
    const {
        BankModel
    } = fastify as extendsFastifyInstance
    fastify.get('/bank/config/interestRate', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const interestRateOptions: IOptionsItem[] = await BankModel.getConfigByKey('interestRate')
            const interestRate = interestRateOptions[0].value
            res.code(200).send(interestRate)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.get('/bank/config/portfolioIrr', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const portfolioIRR = await BankModel.getConfigByKey('ishareCoreETF')
            res.code(200).send(portfolioIRR)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})
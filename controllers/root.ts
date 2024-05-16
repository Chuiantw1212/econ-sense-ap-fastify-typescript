import { FastifyRequest, FastifyReply, } from 'fastify'
import type { extendsFastifyInstance } from '../types/fastify'
import fp from 'fastify-plugin'
import { memoryUsage } from 'node:process';
export default fp(async function (fastify: extendsFastifyInstance | any) {
    fastify.get('/', async function (req: FastifyRequest, res: FastifyReply) {
        const memoryUsageInMB: ReturnType<typeof memoryUsage> = {
            rss: 0,
            heapTotal: 0,
            heapUsed: 0,
            arrayBuffers: 0,
            external: 0,
        }
        const currentMemoryUsage: any = memoryUsage()
        for (let key in memoryUsageInMB) {
            const mb: number = Math.floor(1024 * 1024)
            const value: number = currentMemoryUsage[key]
            const valueInMB: number = Math.floor(value / mb)
            Object.assign(memoryUsageInMB, {
                [key]: `${valueInMB.toLocaleString()}Mb`
            })
        }
        res.code(200).send({
            memoryUsage: memoryUsageInMB,
            startupTime: `${fastify.startupTime}s`,
        })
    })
})

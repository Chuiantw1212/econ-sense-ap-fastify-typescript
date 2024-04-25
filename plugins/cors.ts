import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import {
    FastifyRequest,
} from 'fastify'
/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 * @see https://github.com/fastify/fastify-cors
 */
interface ICorsOptions {
    origin: string | boolean,
    optionsSuccessStatus: number
}

export default fp(async function (fastify, opts) {
    fastify.register(cors, () => {
        return (req: FastifyRequest, callback: any) => {
            const origin: string | boolean = process.env.ORIGIN || 'http://localhost:3000/'
            const corsOptions: ICorsOptions = {
                // This is NOT recommended for production as it enables reflection exploits
                origin,
                optionsSuccessStatus: 200
            }
            // do not include CORS headers for requests from localhost
            if (process.env.MODE === 'development') {
                corsOptions.origin = true
            } else {
                const requestOrigin = req.headers.origin || 'http://localhost:3000/'
                if (/^localhost$/m.test(requestOrigin)) {
                    corsOptions.origin = false
                }
            }
            // callback expects two parameters: error and options
            callback(undefined, corsOptions)
        }
    })
})

'use strict'

import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'
/**
 * Fastify plugin to check environment variables
 * @see https://github.com/fastify/fastify-env
 * @see https://www.npmjs.com/package/ajv
 * @see https://www.npmjs.com/package/env-schema
 */
const options = {
    schema: {
        type: 'object',
        properties: {
            CORS_ORIGINS: {
                type: 'string',
                default: "https://job-pair.com",
            },
        }
    },
    dotenv: true // will read .env in root folder
}

export default fp(async function (fastify,) {
    fastify.register(fastifyEnv, options)
})

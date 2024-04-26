'use strict'

import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'
/**
 * Fastify plugin to check environment variables
 * @see https://github.com/fastify/fastify-env
 * @see https://www.npmjs.com/package/ajv
 * @see https://www.npmjs.com/package/env-schema
 */
const schema = {
    type: 'object',
    properties: {
        MODE: {
            type: 'string',
            default: 'development',
        },
        ORIGIN: {
            type: 'string',
            default: 'http://localhost:5173/'
        }
    }
}

const options = {
    schema: schema,
    dotenv: true // will read .env in root folder
}

export default fp(async function (fastify, opts) {
    fastify
        .register(fastifyEnv, options)
        .ready((err) => {
            if (err) console.error(err)
        })
})

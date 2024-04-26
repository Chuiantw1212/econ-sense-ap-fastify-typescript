// Fastify core
import Fastify from 'fastify'
import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify'
// Plugins
import FormBody from '@fastify/formbody'
import corsPlugin from './plugins/cors'
import envPlugin from './plugins/env'
import firebasePlugin from './plugins/firebase'
// Node native modeuls
import path from 'path'
// Models
import LocationModel from './models/location'
import SelectModel from './models/select'
// Controllsers
import SelectController from './controllers/select'
const appService = async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    const { ready, } = fastify
    // Plugins
    fastify.register(FormBody)
    fastify.register(corsPlugin)
    fastify.register(envPlugin)
    fastify.register(firebasePlugin)
    // Models
    fastify.register(SelectModel)
    fastify.register(LocationModel)
    // Conterollers
    fastify.register(SelectController)
    // Output log
    console.time('Server boot')
    ready(() => {
        console.timeEnd('Server boot')
    })
}
// start listening
const app = Fastify({
    logger: true
})
app.register(appService)
app.listen({ port: 8080 })
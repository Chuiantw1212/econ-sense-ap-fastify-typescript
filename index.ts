console.time('Server boot')
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
import JcicModel from './models/jcic'
import NdcModel from './models/ndc'
// Controllsers
import SelectController from './controllers/select'
import JcicController from './controllers/jcic'
import CalculateController from './controllers/calculate'
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
    fastify.register(JcicModel)
    fastify.register(NdcModel)
    // Conterollers
    fastify.register(SelectController)
    fastify.register(JcicController)
    fastify.register(CalculateController)
    // Output log
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
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
// Models
import LocationModel from './models/location'
import SelectModel from './models/select'
import JcicModel from './models/jcic'
import NdcModel from './models/ndc'
import BankModel from './models/bank'
import UserModel from './models/user'
// Controllsers
import SelectController from './controllers/select'
import BankController from './controllers/bank'
import CalculateController from './controllers/calculate'
import RootController from './controllers/root'
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
    fastify.register(BankModel)
    fastify.register(UserModel)
    // Conterollers
    fastify.register(SelectController)
    fastify.register(BankController)
    fastify.register(CalculateController)
    fastify.register(RootController)
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
/**
 * 保留PORT
 * https://cloud.google.com/functions/docs/configuring/env-var
 */
const port: any = process.env.PORT || 8080
app.listen({ port: port })
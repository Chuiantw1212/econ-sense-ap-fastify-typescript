console.time('Server boot')
// Fastify core
import Fastify from 'fastify'
import { FastifyInstance, } from 'fastify'
// Plugins
import FormBody from '@fastify/formbody'
import corsPlugin from './plugins/cors'
import envPlugin from './plugins/env'
import firebasePlugin from './plugins/firebase'
import chatGptPlugin from './plugins/chatGpt'
import googleCloudPlugin from './plugins/googleCloud'
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
import UserController from './controllers/user'
import ChatController from './controllers/chat'
const appService = async function (fastify: FastifyInstance,) {
    const { ready, } = fastify
    try {
        // Plugins
        await fastify.register(FormBody)
        await fastify.register(corsPlugin)
        await fastify.register(envPlugin)
        await fastify.register(googleCloudPlugin)
        await fastify.register(firebasePlugin)
        await fastify.register(chatGptPlugin)
        // Models
        await fastify.register(SelectModel)
        await fastify.register(LocationModel)
        await fastify.register(JcicModel)
        await fastify.register(NdcModel)
        await fastify.register(BankModel)
        await fastify.register(UserModel)
        // Conterollers
        await fastify.register(SelectController)
        await fastify.register(BankController)
        await fastify.register(CalculateController)
        await fastify.register(RootController)
        await fastify.register(UserController)
        await fastify.register(ChatController)
    } catch (error: any) {
        console.error(error.message || error)
    }
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
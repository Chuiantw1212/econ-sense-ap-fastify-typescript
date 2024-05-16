const startTimeMs = new Date().getTime()
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
        // Plugins Core
        await fastify.register(envPlugin)
        await fastify.register(googleCloudPlugin)
        await fastify.register(firebasePlugin)
        await fastify.register(chatGptPlugin)
        // Plugins Other
        fastify.register(FormBody)
        fastify.register(corsPlugin)
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
        fastify.register(UserController)
        fastify.register(ChatController)
    } catch (error: any) {
        console.error(error.message || error)
    }
    // Output log
    ready(() => {
        const endTimeMs = new Date().getTime()
        const startupTime = (endTimeMs - startTimeMs) / 1000
        console.log(`Server boot:${startupTime}s`)
        fastify.decorate('startupTime', startupTime)
    })
}
// start listening
const app = Fastify({
    logger: true
})
app.register(appService)
/**
 * AppEngine保留PORT
 * https://cloud.google.com/functions/docs/configuring/env-var
 */
/**
 * Cloud Run要host0.0.0.0
 * https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
 */
const port: any = process.env.PORT || 8080
app.listen({
    port: port,
    host: '0.0.0.0'
})
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
        console.log('FormBody')
        await fastify.register(corsPlugin)
        console.log('corsPlugin')
        await fastify.register(envPlugin)
        console.log('envPlugin')
        await fastify.register(googleCloudPlugin)
        console.log('googleCloudPlugin')
        await fastify.register(firebasePlugin)
        console.log('firebasePlugin')
        await fastify.register(chatGptPlugin)
        console.log('chatGptPlugin')
        // Models
        await fastify.register(SelectModel)
        console.log('SelectModel')
        await fastify.register(LocationModel)
        console.log('LocationModel')
        await fastify.register(JcicModel)
        console.log('JcicModel')
        await fastify.register(NdcModel)
        console.log('NdcModel')
        await fastify.register(BankModel)
        console.log('BankModel')
        await fastify.register(UserModel)
        console.log('UserModel')
        // Conterollers
        await fastify.register(SelectController)
        console.log('SelectController')
        await fastify.register(BankController)
        console.log('BankController')
        await fastify.register(CalculateController)
        console.log('CalculateController')
        await fastify.register(RootController)
        console.log('RootController')
        await fastify.register(UserController)
        console.log('UserController')
        await fastify.register(ChatController)
        console.log('ChatController')
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
// Fastify core
import Fastify from 'fastify'
import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify'
// Plugins
import AutoLoad from '@fastify/autoload'
import FormBody from '@fastify/formbody'
// Node native modeuls
import path from 'path'
// Models
import LocationModel from './models/location'
import SelectModel from './models/select'
const appService = async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
    const { ready, } = fastify
    const __dirname = path.resolve()
    // Plugins
    fastify.register(FormBody)
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts),
        // ignorePattern: /.*(uuid|socketio|cache).*/
    })
    // Models
    fastify.register(SelectModel)
    fastify.register(LocationModel)
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'models'),
        options: Object.assign({}, opts),
        ignorePattern: /.*(location|select).*/
    })
    // Conterollers
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'controllers'),
        options: Object.assign({}, opts)
    })
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
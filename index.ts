// Plugins
import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify'
import Fastify from 'fastify'
import path from 'path'
import AutoLoad from '@fastify/autoload'
import FormBody from '@fastify/formbody'
// Models 
// import Industry from './models/industry.js'
// import Location from './models/location.js'
// import Question from './models/question.js'
// import Select from './models/select.js'
// initilize server
const appService = async function (server: FastifyInstance, opts: FastifyPluginOptions) {
    const { ready, } = server
    const __dirname = path.resolve()
    // Plugins
    server.register(FormBody)
    server.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts),
        ignorePattern: /.*(uuid|socketio|cache).js/
    })
    // Models
    server.register(AutoLoad, {
        dir: path.join(__dirname, 'models'),
        options: Object.assign({}, opts),
        ignorePattern: /.*(location|question|select|industry).js/
    })
    // Conterollers
    server.register(AutoLoad, {
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
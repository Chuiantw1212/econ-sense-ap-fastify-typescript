'use strict'
console.time('Server boot')
// Plugins
import path from 'path'
import AutoLoad from '@fastify/autoload'
import FormBody from '@fastify/formbody'
// Models 
import Industry from './models/industry.js'
import Location from './models/location.js'
import Question from './models/question.js'
import Select from './models/select.js'
// initilize server
export default async function (fastify, opts) {
  const { ready, } = fastify
  const __dirname = path.resolve()
  // Plugins
  fastify.register(Cache, {
    includeRoutes: ['/select']
  })
  fastify.register(FormBody)
  fastify.register(UUID)
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
    ignorePattern: /.*(uuid|socketio|cache).js/
  })
  // Models
  fastify.register(Industry)
  fastify.register(Location)
  fastify.register(Question)
  fastify.register(Select)
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'models'),
    options: Object.assign({}, opts),
    ignorePattern: /.*(location|question|select|industry).js/
  })
  // Conterollers
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({}, opts)
  })
  ready(() => {
    console.timeEnd('Server boot')
  })
}
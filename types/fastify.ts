import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { User } from '../models/user'
// Plugins
import { GoogleCloud } from '../plugins/googleCloud.js'

export interface extendsFastifyInstance extends FastifyInstance {
    UserModel: User,
    // uuid4: void,
    googleCloud: GoogleCloud,
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
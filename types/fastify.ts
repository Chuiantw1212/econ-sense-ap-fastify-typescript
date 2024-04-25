import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { User } from '../models/user'
import { JCIC } from '../models/jcic'
// Plugins
import { GoogleCloud } from '../plugins/googleCloud.js'

export interface extendsFastifyInstance extends FastifyInstance {
    UserModel: User,
    JcicModel: JCIC,
    // uuid4: void,
    googleCloud: GoogleCloud,
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
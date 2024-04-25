import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { User } from '../models/user'
import { JCIC } from '../models/jcic'
import { Select } from '../models/select'
// Plugins
import { GoogleCloud } from '../plugins/googleCloud'
import { Firebase } from '../plugins/firebase'

export interface extendsFastifyInstance extends FastifyInstance {
    // Models
    UserModel: User,
    JcicModel: JCIC,
    SelectModel: Select,
    // Plugins
    googleCloud: GoogleCloud,
    firebase: Firebase
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
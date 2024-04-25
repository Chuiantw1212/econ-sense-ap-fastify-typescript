import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { User } from '../models/user'
import { JCIC } from '../models/jcic'
import { Location } from '../models/location'
// Plugins
import { FirebasePlugin } from '../plugins/firebase'

export interface extendsFastifyInstance extends FastifyInstance {
    // Models
    UserModel: User,
    JcicModel: JCIC,
    LocationModel: Location
    // Plugins
    firebase: FirebasePlugin
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { User } from '../models/user'
import { JCIC } from '../models/jcic'
import { Location } from '../models/location'
import { Select } from '../models/select'
// Plugins
import { FirebasePlugin } from '../plugins/firebase'

export interface extendsFastifyInstance extends FastifyInstance {
    // Models
    UserModel: User,
    JcicModel: JCIC,
    LocationModel: Location,
    SelectModel: Select,
    // Plugins
    firebase: FirebasePlugin
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
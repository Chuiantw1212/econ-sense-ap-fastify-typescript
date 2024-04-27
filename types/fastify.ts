import {
    FastifyInstance,
    FastifyPluginOptions,
} from 'fastify'
// Models
import { UserModel } from '../models/user'
import { JcicModel } from '../models/jcic'
import { LocationModel } from '../models/location'
import { SelectModel } from '../models/select'
import { NdcModel } from '../models/ndc'
import { BankModel } from '../models/bank'
// Plugins
import { FirebasePlugin } from '../plugins/firebase'

export interface extendsFastifyInstance extends FastifyInstance {
    // Models
    UserModel: UserModel,
    JcicModel: JcicModel,
    LocationModel: LocationModel,
    SelectModel: SelectModel,
    NdcModel: NdcModel,
    BankModel: BankModel,
    // Plugins
    firebase: FirebasePlugin
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
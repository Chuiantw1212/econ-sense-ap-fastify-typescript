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
import { ChatGptPlugin } from '../plugins/chatGpt'
import { GoogleCloudPlugin } from '../plugins/googleCloud'

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
    chatGpt: ChatGptPlugin,
    googleCloud: GoogleCloudPlugin,
    // meta
    startupTime: number,
}

export interface eFastifyPluginOptions extends FastifyPluginOptions {
    // TODO
}
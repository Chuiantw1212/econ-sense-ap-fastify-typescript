import type { extendsFastifyInstance } from '../types/fastify'
import { FastifyRequest, FastifyReply, } from 'fastify'
import fp from 'fastify-plugin'
export default fp(async function (fastify) {
    const {
        UserModel,
        firebase
    } = fastify as extendsFastifyInstance
    fastify.post('/user/:uid', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm = await UserModel.getUserForm(user.uid)
            res.status(200).send(userForm)
        } catch (error: any) {
            console.log(error.message || error)
            res.status(500).send(error.message || error)
        }
    })
})

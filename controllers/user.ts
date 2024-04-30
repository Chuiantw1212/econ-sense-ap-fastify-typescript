import type { extendsFastifyInstance } from '../types/fastify'
import { FastifyRequest, FastifyReply, } from 'fastify'
import fp from 'fastify-plugin'
import type { IUserForm } from '../types/user'
export default fp(async function (fastify) {
    const {
        UserModel,
        BankModel,
        firebase
    } = fastify as extendsFastifyInstance
    fastify.put('/user/form/profile', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userFormPart = req.body as any
            const userForm: IUserForm = await UserModel.addNewUserForm(user.uid)
            // const interestRate = await BankModel.fetchInterestRate()
            // userForm.mortgage.interestRate = interestRate
            res.status(200).send()
        } catch (error: any) {
            console.log(error.message || error)
            res.status(500).send(error.message || error)
        }
    })
    fastify.post('/user/finance/new', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm: IUserForm = await UserModel.addNewUserForm(user.uid)
            const interestRate = await BankModel.fetchInterestRate()
            userForm.mortgage.interestRate = interestRate
            res.status(200).send(userForm)
        } catch (error: any) {
            console.log(error.message || error)
            res.status(500).send(error.message || error)
        }
    })
    fastify.post('/user/finance/:uid', async function (req: FastifyRequest, res: FastifyReply) {
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

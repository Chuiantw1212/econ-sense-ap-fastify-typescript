import type { extendsFastifyInstance } from '../types/fastify'
import { FastifyRequest, FastifyReply, } from 'fastify'
import fp from 'fastify-plugin'
import { type IUser, } from '../types/user'
export default fp(async function (fastify) {
    const {
        UserModel,
        BankModel,
        firebase
    } = fastify as extendsFastifyInstance
    fastify.put('/user/profile', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeProfile(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/career', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeCareer(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/retirement', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeRetirement(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/estatePrice', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeEstatePrice(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/estateSize', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeEstateSize(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/mortgage', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeMortgage(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/spouse', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeSpouse(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/parenting', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeParenting(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.put('/user/investment', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeInvestment(user.uid, userPart)
            res.code(200).send()
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.post('/user/new', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm: IUser = await UserModel.addNewUser(user.uid)
            const interestRate = await BankModel.getInterestRate()
            if (userForm.mortgage) {
                userForm.mortgage.interestRate = interestRate
            }
            res.code(200).send(userForm)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    fastify.get('/user/type', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const userForm = await UserModel.getUserForm()
            res.code(200).send(userForm)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
    // 不確定如果改成get, cache後會不會造成不驗證直接回傳的狀況
    fastify.post('/user/:uid', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm = await UserModel.getUser(user.uid)

            res.code(200).send(userForm)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
})

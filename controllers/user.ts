import type { extendsFastifyInstance } from '../types/fastify'
import { FastifyRequest, FastifyReply, } from 'fastify'
import fp from 'fastify-plugin'
import type {
    IUserProfile,
    IUserCareer,
    IUserRetirement,
    IUserEstatePrice,
    IUserEstateSize,
    IUserMortgage,
    IUserParenting,
    IUserInvestment,
    IUser
} from '../types/user'
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
            const userPart = req.body as IUserProfile
            await UserModel.mergeByKey(user.uid, 'profile', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/career', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserCareer
            await UserModel.mergeByKey(user.uid, 'career', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/retirement', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserRetirement
            await UserModel.mergeByKey(user.uid, 'retirement', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/estatePrice', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserEstatePrice
            await UserModel.mergeByKey(user.uid, 'estatePrice', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/estateSize', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserEstateSize
            await UserModel.mergeByKey(user.uid, 'estateSize', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/mortgage', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserMortgage
            await UserModel.mergeByKey(user.uid, 'mortgage', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/parenting', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserParenting
            await UserModel.mergeByKey(user.uid, 'parenting', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.put('/user/investment', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as IUserInvestment
            await UserModel.mergeByKey(user.uid, 'investment', userPart)
            res.status(200).send()
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.post('/user/new', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm: IUser = await UserModel.addNewUser(user.uid)
            const interestRate = await BankModel.fetchInterestRate()
            userForm.mortgage.interestRate = interestRate
            res.status(200).send(userForm)
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
    fastify.post('/user/:uid', async function (req: FastifyRequest, res: FastifyReply) {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm = await UserModel.getUser(user.uid)
            res.status(200).send(userForm)
        } catch (error: any) {
            res.status(500).send(error.message || error)
        }
    })
})

import type { extendsFastifyInstance } from '../types/fastify.ts'
export default async function (fastify: extendsFastifyInstance,) {
    const {
        LocationModel
    } = fastify
    fastify.get('/select', async function (req, res,) {
        try {
            const response = LocationModel.getCountiesAndTowns()
            res.status(200).send(response)
        } catch (error: any) {
            res.code(500).send(error.message || error)
        }
    })
}

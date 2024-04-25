import type { extendsFastifyInstance } from '../types/fastify.ts'
export default async function (fastify: extendsFastifyInstance,) {
    fastify.get('/select', async function (req, res,) {
        // const locations = await Location.getAll()
        // res.status(200).send(locations)
        
    })
}

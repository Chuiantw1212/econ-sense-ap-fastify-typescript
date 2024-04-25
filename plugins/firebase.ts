import fp from 'fastify-plugin'
const { initializeApp, applicationDefault } = require('firebase-admin/app');
export class Firebase {
    constructor() {
        /**
         * https://firebase.google.com/docs/reference/admin/node/firebase-admin.app.md#applicationdefault_2121df4
         */
        initializeApp({
            credential: applicationDefault(),
        })
    }
}
export default fp(async function (fastify, opts) {
    const firebase = new Firebase()
    fastify.decorate('firebase', firebase)
})

import fp from 'fastify-plugin'
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore, } = require('firebase-admin/firestore');
export class Firebase {
    firestore: any
    constructor() {
        /**
         * https://firebase.google.com/docs/reference/admin/node/firebase-admin.app.md#applicationdefault_2121df4
         */
        initializeApp({
            credential: applicationDefault(),
        })
        this.firestore = getFirestore();
    }
}
export default fp(async function (fastify, opts) {
    const firebase = new Firebase()
    fastify.decorate('firebase', firebase)
})

import fp from 'fastify-plugin'
import fs from 'fs'
import path from 'path'
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// https://github.com/firebase/firebase-functions/issues/1425
const admin = require("firebase-admin");
const { getFirestore, } = require('firebase-admin/firestore');
export class FirebasePlugin {
    firestore: any
    constructor() {
        // /**
        //  * https://console.firebase.google.com/project/econ-sense-9a250/settings/serviceaccounts/adminsdk
        //  * https://firebase.google.com/docs/reference/admin/node/firebase-admin.app.md#applicationdefault_2121df4
        //  */
        // const serviceAccount = path.join(__dirname, '../serviceAccountKey.json')
        // try {
        //     admin.initializeApp({
        //         credential: admin.credential.cert(serviceAccount)
        //     });
        //     this.firestore = getFirestore();

        // } catch (error) {
        //     console.log('something wrong');
            
        //     throw error
        // }
        // console.log('FirebasePlugin');
    }
}
export default fp(async function (fastify, opts) {
    const firebase = new FirebasePlugin()
    fastify.decorate('firebase', firebase)
})

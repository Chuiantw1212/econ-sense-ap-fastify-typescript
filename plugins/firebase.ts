import fp from 'fastify-plugin'
import fs from 'fs'
import path from 'path'
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// https://github.com/firebase/firebase-functions/issues/1425
const admin = require("firebase-admin");
const { getFirestore, } = require('firebase-admin/firestore');
export class Firebase {
    firestore: any
    constructor() {
        /**
         * https://firebase.google.com/docs/reference/admin/node/firebase-admin.app.md#applicationdefault_2121df4
         */
        const serviceAccount = path.join(__dirname, '../serviceAccountKey.json')
        // console.log(pathToKey);
        // var serviceAccount = require("path/to/serviceAccountKey.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        // const credential = cert(pathToKey)
        // console.log(credential);
        // try {
        //     initializeApp({
        //         credential,
        //         // databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
        //     });
        // } catch (error) {
        //     console.log(error)
        // }
        // console.log('?');
        // initializeApp({
        //     credential: applicationDefault(),
        // })
        this.firestore = getFirestore();
    }
}
export default fp(async function (fastify, opts) {
    const firebase = new Firebase()
    fastify.decorate('firebase', firebase)
})

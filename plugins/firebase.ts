import fp from 'fastify-plugin'
import fs from 'fs'
import path from 'path'
const admin = require("firebase-admin");
const { getFirestore, } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
export class FirebasePlugin {
    firestore: any
    bucketPublic: any
    constructor() {
        /**
         * https://console.firebase.google.com/project/econ-sense-9a250/settings/serviceaccounts/adminsdk
         * https://firebase.google.com/docs/reference/admin/node/firebase-admin.app.md#applicationdefault_2121df4
         */
        const serviceAccount = path.join(__dirname, '../serviceAccountKey.json')
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        /**
         * https://firebase.google.com/docs/firestore/quickstart
         */
        this.firestore = getFirestore();
        /**
         * https://firebase.google.com/docs/storage/admin/start
         */
        this.bucketPublic = getStorage().bucket('public.econ-sense.com');
    }
    getPublicFiles() {
        this.bucketPublic.getFiles(function (err: any, files: File[]) {
            if (!err) {
                // files is an array of File objects.
                console.log(files);
            }
        });
    }
}
export default fp(async function (fastify, opts) {
    const firebase = new FirebasePlugin()
    fastify.decorate('firebase', firebase)
})

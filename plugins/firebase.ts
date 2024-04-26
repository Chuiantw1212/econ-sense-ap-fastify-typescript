import fp from 'fastify-plugin'
import path from 'path'
import admin from "firebase-admin"
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
export class FirebasePlugin {
    firestore: Firestore
    bucketPublic: ReturnType<Storage['bucket']>
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
        const firebaseStorage: Storage = getStorage()
        this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com');
    }
    getPublicFiles() {
        this.bucketPublic.getFiles(function (err, files) {
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

import fp from 'fastify-plugin'
import path from 'path'
import admin from "firebase-admin"
import { applicationDefault } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
export class FirebasePlugin {
    firestore: Firestore
    bucketPublic: ReturnType<Storage['bucket']>
    constructor() {
        /**
         * https://firebase.google.com/docs/admin/setup
         */
        admin.initializeApp({
            credential: applicationDefault()
        })
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
export default fp(async function (fastify) {
    const firebase = new FirebasePlugin()
    fastify.decorate('firebase', firebase)
})

import fp from 'fastify-plugin'
import admin from "firebase-admin"
import { applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'
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
    async verifyIdToken(idToken: string) {
        try {
            if (!idToken) {
                throw 'idToken is not given.'
            }
            const replacedToken = idToken.replace('Bearer ', '')
            const decodedToken = await getAuth().verifyIdToken(replacedToken)
            if (!decodedToken) {
                throw '未知的用戶'
            }
            return decodedToken
        } catch (error) {
            throw error
        }
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

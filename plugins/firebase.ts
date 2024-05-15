import fp from 'fastify-plugin'
import admin from "firebase-admin"
import { applicationDefault } from 'firebase-admin/app';
import type { extendsFastifyInstance } from '../types/fastify'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
import { GoogleCloudPlugin } from './googleCloud'
export class FirebasePlugin {
    firestore: Firestore | any
    bucketPublic: ReturnType<Storage['bucket']> | any
    googleCloud: GoogleCloudPlugin
    constructor(fastify: extendsFastifyInstance) {
        this.googleCloud = fastify.googleCloud
    }
    async initialize() {
        /**
         * https://firebase.google.com/docs/admin/setup
        */
        if (process.env.MODE === 'development') {
            const GOOGLE_APPLICATION_CREDENTIALS = await this.googleCloud.accessLatestSecretVersion('GOOGLE_APPLICATION_CREDENTIALS')
            const credential = admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS)
            admin.initializeApp({
                credential: credential
            })
        } else {
            admin.initializeApp({
                credential: applicationDefault()
            })
        }
        this.firestore = getFirestore();
        /**
         * https://firebase.google.com/docs/storage/admin/start
         */
        const firebaseStorage: Storage = getStorage()
        this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com')
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
        this.bucketPublic.getFiles(function (err: any, files: []) {
            if (!err) {
                // files is an array of File objects.
                console.log(files);
            }
        });
    }
}
export default fp(async function (fastify: any) {
    const firebase = new FirebasePlugin(fastify)
    await firebase.initialize()
    fastify.decorate('firebase', firebase)
})

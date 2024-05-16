import fp from 'fastify-plugin'
import admin, { type ServiceAccount } from "firebase-admin"
import type { extendsFastifyInstance } from '../types/fastify'
import { getAuth, } from 'firebase-admin/auth'
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
        try {
            if (process.env.MODE === 'development') {
                const FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await this.googleCloud.accessLatestSecretVersion('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
                const credential = admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
                admin.initializeApp({
                    credential
                })
            } else {
                /**
                 * Handling sensitive configuration with Secret Manager
                 * https://cloud.google.com/run/docs/tutorials/identity-platform#secret-manager
                 * https://firebase.google.com/docs/reference/admin/node/firebase-admin.credential_n.md#credentialcert
                 */
                const { FIREBASE_SERVICE_ACCOUNT_KEY_JSON = '', } = process.env
                let serviceAccountPathOrObject = null
                if (typeof FIREBASE_SERVICE_ACCOUNT_KEY_JSON === 'string') {
                    serviceAccountPathOrObject = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY_JSON);
                } else {
                    serviceAccountPathOrObject = FIREBASE_SERVICE_ACCOUNT_KEY_JSON
                }
                const serviceAccountfrom: ServiceAccount = {
                    projectId: serviceAccountPathOrObject.project_id,
                    clientEmail: serviceAccountPathOrObject.client_email,
                    privateKey: serviceAccountPathOrObject.private_key
                }
                const credential =  admin.credential.cert(serviceAccountfrom)
                admin.initializeApp({
                    credential,
                })
            }
            this.firestore = getFirestore();
            /**
             * https://firebase.google.com/docs/storage/admin/start
            */
            const firebaseStorage: Storage = getStorage()
            this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com')
        } catch (error: any) {
            console.error(error.message || error)
            throw error
        }
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

import fp from 'fastify-plugin'
const { Storage } = require('@google-cloud/storage');
const { Firestore, } = require('@google-cloud/firestore');

export class GoogleCloud {
    bucket: typeof Storage
    firestore: typeof Firestore
    constructor() {
        // // Creates a client using Application Default Credentials
        // const storage = new Storage();
        // this.bucket = storage.bucket('public.econ-sense.com');
        // // Obtain a document reference.
        // this.firestore = new Firestore();
        // console.log('GoogleCloud');

    }
    getPublicFiles() {
        this.bucket.getFiles(function (err: any, files: File[]) {
            if (!err) {
                // files is an array of File objects.
                console.log(files);
            }
        });
    }
}
export default fp(async function (fastify, opts) {
    const googleCloud = new GoogleCloud()
    fastify.decorate('googleCloud', googleCloud)
})

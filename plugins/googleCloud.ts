import fp from 'fastify-plugin'
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
export class GoogleCloudPlugin {
    sercertManagerServiceClient: typeof SecretManagerServiceClient = null
    constructor() {
        // Instantiates a client
        const client = new SecretManagerServiceClient()
        this.sercertManagerServiceClient = client
        this.grantAccess()
    }
    async grantAccess() {
        const name = 'projects/449033690264/secrets/GOOGLE_APPLICATION_CREDENTIALS'
        const member = 'chuiantw1212@gmail.com'
        // Get the current IAM policy.
        const [policy] = await this.sercertManagerServiceClient.getIamPolicy({
            resource: name,
        });

        // Add the user with accessor permissions to the bindings list.
        policy.bindings.push({
            role: 'roles/secretmanager.secretAccessor',
            members: [member],
        });

        // Save the updated IAM policy.
        await this.sercertManagerServiceClient.setIamPolicy({
            resource: name,
            policy: policy,
        });

        console.log(`Updated IAM policy for ${name}`);
    }
}
export default fp(async function (fastify) {
    const googleCloud = new GoogleCloudPlugin()
    fastify.decorate('googleCloud', googleCloud)
})

import fp from 'fastify-plugin'
import path from 'path'
export class ChatGptPlugin {
    instance: any
    constructor() {
        this.initialize()
    }
    async initialize() {
        const { ChatGPTAPI } = await import('chatgpt')
        const apiKeyPath = path.join(__dirname, '../OPENAI_API_KEY.json')
        const apiKey = require(apiKeyPath)
        const instance: any = new ChatGPTAPI({
            apiKey,
        })
        this.instance = instance
    }
    async sendMessage(story: string) {
        const res = await this.instance.sendMessage(story, {
            systemMessage: `你是個說書人，請為我美化不同的獨立小故事。`
        })
        return res
    }
}
export default fp(async function (fastify) {
    fastify.decorate('chatGpt', new ChatGptPlugin())
})

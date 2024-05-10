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
        instance.sendMessage('請為我美化每則獨立故事。')
        this.instance = instance
    }
    async makeStory(story: string) {
        const res = await this.instance.sendMessage(`
            請用中文為我美化以下的故事，將內容擴充到500字，並用p標籤排版。\n\n
            ${story}
        `)
        const { text } = res
        return text
    }
}
export default fp(async function (fastify) {
    fastify.decorate('chatGpt', new ChatGptPlugin())
})

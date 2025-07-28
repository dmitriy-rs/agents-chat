import { generateTextResponse } from "./services/ai/llm"
import { createOpenAIModel } from "./services/ai/model"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages } = body

    const id = messages.length.toString()

    const openaiModel = createOpenAIModel()
    const response = await generateTextResponse(openaiModel, messages)

    return {
        id,
        role: 'assistant',
        content: response
    }
})